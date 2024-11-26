'use client';
import { Alert, Button, LoadingOverlay, MultiSelect, Select, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { useAsyncFn } from 'react-use';
import { roleSelector } from '../admin/editUser/constants/roleSelector';
import { useAlertModeMutators } from '../admin/editUser/globalState/alertModeState';
import { useSelectTags } from '../admin/editUser/hooks/tagSelector';
import { privacyBeaconUserSchema } from './validation/userShema';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { CreatePrivateBeaconUserRequest } from '@/types/request';
import { endpoints } from '@/utils/endpoint';
import { UI_DATA } from '../admin/editUser/constants/uidata';

type PropsType = {
  privateKey: string;
};

function BeaconRegisterForm({ privateKey }: PropsType) {
  const community = useCommunityState();
  const selectTags = useSelectTags();
  const [visible] = useDisclosure(true);
  const { setAlertMode } = useAlertModeMutators();
  const displayAlert = (alertMode: number) => {
    setAlertMode(alertMode);
    setTimeout(() => {
      setAlertMode(-1);
    }, 5000);
  };

  // // const [{ value, loading, error }, doFetch] = useAsyncFn(async (values) => {  // こうするとvalueもとれる。
  const [{ loading, error }, submitCreateUser] = useAsyncFn(async (values) => {
    let numTagIds: number[] = [];
    values.tagIds.map((tagId: string) => numTagIds.push(parseInt(tagId)));
    let createUserRequest: CreatePrivateBeaconUserRequest = {
      name: values.name,
      uuid: '',
      email: values.email,
      role: parseInt(values.role),
      communityId: community.communityId,
      beaconName: UI_DATA.BEACON_NAME_STAYWATCHBEACON,
      tagIds: numTagIds,
      privateKey: privateKey,
    };
    await axios.post(endpoints.users, createUserRequest);
    // これより下は成功した時のみ動作する
    displayAlert(1);
    form.reset();
  });

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      role: '1',
      communityId: 0,
      tagIds: [],
    },
    validate: zodResolver(privacyBeaconUserSchema),
  });

  return (
    <div>
      {loading && <LoadingOverlay visible={visible} overlayProps={{ blur: 3 }} />}
      <div>
        <form
          className='flex flex-col px-10 pb-4 pt-2'
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
              label='権限'
              className='w-1/2'
              placeholder='権限レベルを選択してください'
              data={roleSelector}
              {...form.getInputProps('role')}
            />
          </div>
          <MultiSelect
            label='タグ'
            placeholder='タグを選択してください'
            data={selectTags}
            {...form.getInputProps('tagIds')}
          />
          <div className='pt-3'>
            <Button type='submit' className='bg-staywatch-accent' color='#1e5266'>
              登録する
            </Button>
          </div>

          {/* @ts-ignore (error.responseが取得できるにもかかわらず型定義がされていないため) */}
          {error && error.response.status === 409 && (
            <Alert title='失敗' color='red'>
              登録済みのビーコンです
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
}

export default BeaconRegisterForm;
