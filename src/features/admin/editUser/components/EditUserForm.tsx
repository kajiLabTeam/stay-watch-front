'use client';
import { TextInput, MultiSelect, Select, LoadingOverlay, Alert } from '@mantine/core';
import { Button, Modal } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { useAsyncFn } from 'react-use';
import { useSWRConfig } from 'swr';
import { beaconSelector } from '../constants/beaconSelector';
import { UI_DATA } from '../constants/uidata';
import { userSchema } from '../validation/userShema';
import { roleSelector } from '@/features/admin/editUser/constants/roleSelector';
import { useAlertModeMutators } from '@/features/admin/editUser/globalState/alertModeState';
import { useEditingUserMutators } from '@/features/admin/editUser/globalState/editingUserState';
import { useSelectTags } from '@/features/admin/editUser/hooks/tagSelector';
import { useUserState } from '@/globalStates/firebaseUserState';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { UpdateUserRequest } from '@/types/request';
import { UserEditor } from '@/types/user';
import { endpoints } from '@/utils/endpoint';

export const EditUserForm = (props: { user: UserEditor }) => {
  const { user } = props;
  const firebaseUser = useUserState();
  const community = useCommunityState();
  const selectTags = useSelectTags();
  const currentTagIds = user.tags.map((tag) => tag.id.toString());
  const [visible] = useDisclosure(true);
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate } = useSWRConfig();
  const { setEditingUserId } = useEditingUserMutators();
  const { setAlertMode } = useAlertModeMutators();

  const displayAlert = (alertMode: number) => {
    setAlertMode(alertMode);
    setTimeout(() => {
      setAlertMode(-1);
    }, 5000);
  };

  const [{ loading: loadingUpdateUser, error: errorUpdateUser }, updateUser] = useAsyncFn(
    async (values) => {
      if (firebaseUser) {
        let numTagIds: number[] = [];
        values.tagIds.map((tagId: string) => numTagIds.push(parseInt(tagId)));
        let updateUserRequest: UpdateUserRequest = {
          id: user.id,
          name: values.name,
          uuid: values.uuid,
          email: values.email,
          role: parseInt(values.role),
          communityId: community.communityId,
          beaconName: values.beaconName,
          tagIds: numTagIds,
        };
        const token = await firebaseUser.getIdToken();
        await axios.put(endpoints.users, updateUserRequest, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        mutate(`${endpoints.adminUsers}/${community.communityId}`);
        setEditingUserId(-1);
        displayAlert(2);
      }
    },
  );

  const [{ loading: loadingDeleteUser, error: errorDeleteUser }, deleteUser] = useAsyncFn(
    async (userId) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        await axios.delete(`${endpoints.users}/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // これより下は成功した時のみ動作する
        mutate(`${endpoints.adminUsers}/${community.communityId}`);
        setEditingUserId(-1);
        displayAlert(3);
      }
    },
  );

  const form = useForm({
    initialValues: {
      id: user.id,
      name: user.name,
      uuid: user.uuid.slice(-5),
      email: user.email,
      role: user.role.toString(),
      communityId: 0,
      beaconName: user.beaconName,
      tagIds: currentTagIds,
    },
    validate: zodResolver(userSchema),
  });

  return (
    <div>
      {(loadingDeleteUser || loadingUpdateUser) && (
        <LoadingOverlay visible={visible} overlayProps={{ blur: 3 }} />
      )}
      <Modal opened={opened} onClose={close} title='削除確認'>
        <div className='my-4 border' />
        <div>ユーザ情報を削除しますか？</div>
        <div className='my-4 border' />
        <div className='space-x-4 pt-4 text-right'>
          <Button type='button' variant='outline' color='gray' onClick={close}>
            キャンセル
          </Button>
          <Button
            type='button'
            className='bg-red-400'
            color='red'
            onClick={() => deleteUser(user.id)}
          >
            削除する
          </Button>
          {errorDeleteUser && (
            <Alert title='失敗' color='red'>
              エラーが発生しました
            </Alert>
          )}
        </div>
      </Modal>
      <div className='rounded-lg bg-slate-200 px-10 pb-4'>
        <h1 className='pt-2 text-left text-2xl text-slate-800'>{user.name}</h1>
        <form
          className=' flex flex-col'
          onSubmit={form.onSubmit((values) => {
            const modifiedValues = { ...values, communityId: community.communityId };
            updateUser(modifiedValues);
          })}
        >
          <TextInput placeholder='tarou' label='名前' {...form.getInputProps('name')} />
          <TextInput
            label='Gメールアドレス（任意）'
            placeholder='your@gmail.com'
            {...form.getInputProps('email')}
          />
          <div className='flex space-x-4'>
            <Select
              className='w-1/2'
              label='ビーコンの形態'
              placeholder='ビーコンの形態を選択してください'
              data={beaconSelector}
              {...form.getInputProps('beaconName')}
            />
            <Select
              label='権限'
              className='w-1/2'
              placeholder='権限レベルを選択してください'
              data={roleSelector}
              {...form.getInputProps('role')}
            />
          </div>
          {form.values.beaconName === UI_DATA.BEACON_NAME_FCS1301 && (
            <TextInput
              label='ビーコンのID（5文字）'
              placeholder='UUID'
              {...form.getInputProps('uuid')}
            />
          )}
          <MultiSelect
            label='タグ'
            placeholder='属性を選択してください'
            data={selectTags}
            {...form.getInputProps('tagIds')}
          />
          <div className='flex pt-3'>
            <div className='mr-auto space-x-4'>
              <Button type='submit' className='bg-staywatch-accent' color='#1e5266'>
                保存
              </Button>
              <Button
                type='button'
                variant='outline'
                className='border-2'
                color='gray'
                onClick={() => setEditingUserId(-1)}
              >
                中止
              </Button>
            </div>
            <div>
              <Button type='button' className='bg-red-400' color='red' onClick={open}>
                削除
              </Button>
            </div>
          </div>
          {/* @ts-ignore (error.responseが取得できるにもかかわらず型定義がされていないため) */}
          {errorUpdateUser && errorUpdateUser.response.status === 409 && (
            <Alert title='失敗' color='red'>
              このメールアドレスは既に登録されています
            </Alert>
          )}
          {/* @ts-ignore (error.responseが取得できるにもかかわらず型定義がされていないため) */}
          {errorUpdateUser && errorUpdateUser.response.status !== 409 && (
            <Alert title='失敗' color='red'>
              エラーが発生しました
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
};
