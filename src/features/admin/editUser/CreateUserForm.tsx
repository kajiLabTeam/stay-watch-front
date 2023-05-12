import { TextInput, MultiSelect, Select, LoadingOverlay, Alert } from '@mantine/core';
import { Button } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { useSWRConfig } from 'swr';
import { userSchema } from './roles/userShema';
import { beaconSelector } from '@/features/admin/editUser/constants/beaconSelector';
import { useAlertModeMutators } from '@/features/admin/editUser/hooks/alertModeState';
import { useRoles } from '@/features/admin/editUser/hooks/editingUserState';
import { useSelectTags } from '@/features/admin/editUser/hooks/tagSelector';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { endpoints } from '@/utils/api';

export const CreateUserForm = () => {
  const community = useCommunityState();
  const selectTags = useSelectTags();
  const roles = useRoles();
  const [visible] = useDisclosure(true);
  const { setAlertMode } = useAlertModeMutators();
  const displayAlert = (alertMode: number) => {
    setAlertMode(alertMode);
    setTimeout(() => {
      setAlertMode(-1);
    }, 3000);
  };
  const { mutate } = useSWRConfig();

  // const [{ value, loading, error }, doFetch] = useAsyncFn(async (values) => {  // こうするとvalueもとれる。
  const [{ loading, error }, doFetch] = useAsyncFn(async (values) => {
    await axios.post(endpoints.users, values);
    // これより下は成功した時のみ動作する
    mutate(`${endpoints.adminUsers}/${community.communityId}`);
    displayAlert(1);
    form.reset();
  });

  const form = useForm({
    initialValues: {
      name: '',
      uuid: '',
      email: '',
      role: 1,
      communityId: community.communityId,
      beaconName: '',
      tagIds: [],
    },
    validate: zodResolver(userSchema),
  });

  useEffect(() => {
    if (form.values.beaconName === 'FCS1301') {
      form.setValues({ uuid: '' });
    } else {
      // 00000にしておかないと見えない入力欄だがバリデーションで引っ掛かってしまう
      form.setValues({ uuid: '00000' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.beaconName, form.setValues]);

  return (
    <div>
      {loading && <LoadingOverlay visible={visible} overlayBlur={3} />}
      <div className='rounded-lg bg-slate-200'>
        <h1 className='pt-4 text-center text-3xl font-bold text-slate-800'>新規登録</h1>
        <form
          className=' flex flex-col px-10 py-4'
          onSubmit={form.onSubmit((values) => {
            doFetch(values);
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
            placeholder='タグを選択してください'
            data={selectTags}
            {...form.getInputProps('tagIds')}
          />
          <div className='pt-3'>
            <Button type='submit' className='bg-blue-400' color='blue'>
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
