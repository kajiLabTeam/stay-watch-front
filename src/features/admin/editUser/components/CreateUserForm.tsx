'use client';
import { TextInput, Select, LoadingOverlay, Alert, TagsInput } from '@mantine/core';
import { Button } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { useAsyncFn } from 'react-use';
import { useSWRConfig } from 'swr';
import { roleSelector } from '../constants/roleSelector';
import { userSchema } from '../validation/userShema';
import { useAlertModeMutators } from '@/features/admin/editUser/globalState/alertModeState';
import { useSelectTags } from '@/features/admin/editUser/hooks/tagSelector';
import { useUserState } from '@/globalStates/firebaseUserState';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { BeaconType } from '@/types/beacon';
import { CreateUserRequest } from '@/types/request';
import { endpoints } from '@/utils/endpoint';

export const CreateUserForm = (props: { beaconTypes: BeaconType[] }) => {
  const { beaconTypes } = props;
  const user = useUserState();
  const community = useCommunityState();
  const selectTags = useSelectTags();
  const [visible] = useDisclosure(true);
  const { setAlertMode } = useAlertModeMutators();
  const displayAlert = (alertMode: number) => {
    setAlertMode(alertMode);
    setTimeout(() => {
      setAlertMode(-1);
    }, 3000);
  };
  const { mutate } = useSWRConfig();

  const beaconSelector = [
    ...beaconTypes.map((beaconType) => ({
      value: beaconType.beaconName,
      label: beaconType.beaconName,
      disabled: beaconType.uuidEditable,
    })),
    {
      value: '',
      label: '未所持',
      disabled: false,
    },
  ];

  const [{ loading, error }, submitCreateUser] = useAsyncFn(async (values) => {
    if (user) {
      let createUserRequest: CreateUserRequest = {
        name: values.name,
        uuid: values.uuid,
        email: values.email,
        role: parseInt(values.role),
        communityId: community.communityId,
        beaconName: values.beaconName,
        tagNames: values.tagNames,
      };
      const token = await user.getIdToken();
      await axios.post(endpoints.users, createUserRequest, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      // これより下は成功した時のみ動作する
      mutate(`${endpoints.adminUsers}/${community.communityId}`);
      displayAlert(1);
      form.reset();
    }
  });

  const form = useForm({
    initialValues: {
      name: '',
      uuid: '',
      email: '',
      role: '1',
      communityId: 0,
      beaconName: '',
      tagNames: [],
    },
    validate: zodResolver(userSchema),
  });

  return (
    <div>
      {loading && <LoadingOverlay visible={visible} overlayProps={{ blur: 3 }} />}
      <div className='rounded-lg bg-slate-200'>
        <h1 className='pt-4 text-center text-3xl font-bold text-slate-800'>新規登録</h1>
        <form
          className='flex flex-col px-10 py-4'
          onSubmit={form.onSubmit((values) => {
            submitCreateUser(values);
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
          <TagsInput
            label='タグ'
            placeholder='タグを選択してください'
            data={selectTags}
            {...form.getInputProps('tagNames')}
          />
          <div className='pt-3'>
            <Button type='submit' className='bg-staywatch-accent' color='#1e5266'>
              登録する
            </Button>
          </div>

          {/* @ts-ignore (error.responseが取得できるにもかかわらず型定義がされていないため) */}
          {error && error.response.status === 409 && (
            <Alert title='失敗' color='red'>
              このメールアドレスは既に登録されています
            </Alert>
          )}
          {/* @ts-ignore (error.responseが取得できるにもかかわらず型定義がされていないため) */}
          {error && error.response.status !== 409 && (
            <Alert title='失敗' color='red'>
              エラーが発生しました
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
};
