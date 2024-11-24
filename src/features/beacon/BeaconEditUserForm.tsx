'use client';
import { Alert, Button, LoadingOverlay, Select } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAsyncFn } from 'react-use';
import { useAlertModeMutators } from '../admin/editUser/globalState/alertModeState';
import { privacyBeaconEditUserSchema } from './validation/privacyBeaconEditUserSchema';
import Error from '@/components/common/Error';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { useGetAPI } from '@/hooks/useGetAPI';
import { UpdatePrivateBeaconUserRequest } from '@/types/request';
import { User } from '@/types/user';
import { endpoints } from '@/utils/endpoint';

type UsersSelectData = {
  label: string;
  value: string;
};

type PropsType = {
  privateKey: string;
};

function BeaconEditUserForm({ privateKey }: PropsType) {
  const [visible] = useDisclosure(true);
  const { setAlertMode } = useAlertModeMutators();
  const community = useCommunityState();
  const [usersSelecter, setUsersSelecter] = useState<Array<UsersSelectData>>([]);
  const { data: users, error: errorUsers } = useGetAPI<User[]>(
    `${endpoints.users}/${community.communityId}`,
  );
  const displayAlert = (alertMode: number) => {
    setAlertMode(alertMode);
    setTimeout(() => {
      setAlertMode(-1);
    }, 5000);
  };

  // // const [{ value, loading, error }, doFetch] = useAsyncFn(async (values) => {  // こうするとvalueもとれる。
  const [{ loading, error }, submitEditUser] = useAsyncFn(async (values) => {
    let updateUserRequest: UpdatePrivateBeaconUserRequest = {
      id: parseInt(values.id),
      beaconName: 'StayWatchBeacon',
      privateKey: privateKey,
    };
    await axios.put(endpoints.users, updateUserRequest);
    // これより下は成功した時のみ動作する
    displayAlert(2);
    form.reset();
  });

  useEffect(() => {
    let tmpUsersSelecterData: UsersSelectData[] = [];
    users?.map((user) => {
      tmpUsersSelecterData.push({
        label: user.name,
        value: String(user.id),
      });
    });
    setUsersSelecter(tmpUsersSelecterData);
  }, [users]);

  const form = useForm({
    initialValues: {
      id: '-1',
    },
    validate: zodResolver(privacyBeaconEditUserSchema),
  });

  if (errorUsers) return <Error message='ユーザ情報取得失敗' />;
  return (
    <div>
      {loading && <LoadingOverlay visible={visible} overlayProps={{ blur: 3 }} />}
      <div>
        <form
          className='flex flex-col px-10 pb-4 pt-2'
          onSubmit={form.onSubmit((values) => {
            submitEditUser(values);
          })}
        >
          <Select
            label='ユーザ'
            placeholder='ユーザを選択してください'
            data={usersSelecter}
            // data={[
            //   {value: '1', label: 'hayashi'},
            //   {value: '2', label: 'togawa'}
            // ]}
            {...form.getInputProps('id')}
          />
          <div className='pt-3'>
            <Button type='submit' className='bg-staywatch-accent' color='#1e5266'>
              保存する
            </Button>
          </div>

          {/* @ts-ignore (error.responseが取得できるにもかかわらず型定義がされていないため) */}
          {error && error.response.status === 409 && (
            <Alert title='失敗' color='red'>
              登録済みのユーザです
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

export default BeaconEditUserForm;
