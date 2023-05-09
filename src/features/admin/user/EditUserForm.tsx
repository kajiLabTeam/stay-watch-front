import { TextInput, MultiSelect, Select, LoadingOverlay, Alert } from '@mantine/core';
import { Button, Modal } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { useAsyncFn } from 'react-use';
import { useSWRConfig } from 'swr';
import { userSchema } from './roles/userShema';
import { useAlertModeMutators } from '@/features/admin/user/hooks/alertModeState';
import { useSelectBeacons } from '@/features/admin/user/hooks/beaconSelector';
import { useRoles, useTagIds } from '@/features/admin/user/hooks/editingUserState';
import { useEditingUserMutators } from '@/features/admin/user/hooks/editingUserState';
import { useSelectTags } from '@/features/admin/user/hooks/tagSelector';
import { UserEditor } from '@/types/user';
import { endpoints } from '@/utils/api';

export const EditUserForm = (props: { user: UserEditor }) => {
  const selectBeacons = useSelectBeacons();
  const selectTags = useSelectTags();
  const currentTagIds = useTagIds(props.user.tags);
  const roles = useRoles();
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

  const [statusUpdateUser, updateUser] = useAsyncFn(async (values) => {
    await axios.put(endpoints.users2, values);
    mutate(endpoints.adminUsers);
    setEditingUserId(-1);
    displayAlert(2);
  });

  const [statusDeleteUser, deleteUser] = useAsyncFn(async (userId) => {
    await axios.delete(`${endpoints.users2}/${userId}`);
    // これより下は成功した時のみ動作する
    mutate(endpoints.adminUsers);
    setEditingUserId(-1);
    displayAlert(3);
  });

  const form = useForm({
    initialValues: {
      id: props.user.id,
      name: props.user.name,
      uuid: props.user.uuid.slice(-5),
      email: props.user.email,
      role: props.user.role,
      communityId: 2,
      beaconName: props.user.beaconName,
      tagIds: currentTagIds,
    },
    validate: zodResolver(userSchema),
  });

  return (
    <div>
      {(statusDeleteUser.loading || statusUpdateUser.loading) && (
        <LoadingOverlay visible={visible} overlayBlur={3} />
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
            onClick={() => deleteUser(props.user.id)}
          >
            削除する
          </Button>
          {statusDeleteUser.error && (
            <Alert title='失敗' color='red'>
              エラーが発生しました
            </Alert>
          )}
        </div>
      </Modal>
      <div className='rounded-lg bg-slate-200 px-10 pb-4'>
        <h1 className='pt-2 text-left text-2xl text-slate-800'>{props.user.name}</h1>
        <form
          className=' flex flex-col'
          onSubmit={form.onSubmit((values) => {
            updateUser(values);
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
              data={selectBeacons}
              {...form.getInputProps('beaconName')}
            />
            <Select
              label='権限'
              className='w-1/2'
              placeholder='権限レベルを選択してください'
              data={roles}
              {...form.getInputProps('role')}
            />
          </div>
          {form.values.beaconName === 'FCS1301' && (
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
              <Button type='submit' className='bg-blue-400' color='blue'>
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
          {statusUpdateUser.error && statusUpdateUser.error.response.status === 409 && (
            <Alert title='失敗' color='red'>
              このメールアドレスは既に登録されています
            </Alert>
          )}
          {statusUpdateUser.error && statusUpdateUser.error.response.status !== 409 && (
            <Alert title='失敗' color='red'>
              エラーが発生しました
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
};
