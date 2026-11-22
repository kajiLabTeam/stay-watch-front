import { Alert, Button, LoadingOverlay, Select } from '@mantine/core';
import { useZodForm } from '@/hooks/useZodForm';
import { ApiError, request } from '@/utils/api';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { UI_DATA } from '../admin/editUser/constants/uidata';
import { useAlertModeMutators } from '@/atoms/alertModeAtom';
import { privacyBeaconEditUserSchema } from './validation/privacyBeaconEditUserSchema';
import Error from '@/components/common/Error';
import { useUserState } from '@/atoms/firebaseUserAtom';
import { useCommunityState } from '@/atoms/communityAtom';
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
  const { setAlertMode } = useAlertModeMutators();
  const community = useCommunityState();
  const firebaseUser = useUserState();
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

  const {
    isPending: loading,
    error,
    mutate: submitEditUser,
  } = useMutation<void, ApiError, typeof form.values>({
    mutationFn: async (values: typeof form.values) => {
      if (firebaseUser) {
        let updateUserRequest: UpdatePrivateBeaconUserRequest = {
          id: parseInt(values.id),
          beaconName: UI_DATA.BEACON_NAME_PRIVBEACON,
          privateKey: privateKey,
        };
        const token = await firebaseUser.getIdToken();
        await request(endpoints.users, { method: 'PUT', token, body: updateUserRequest });

        // これより下は成功した時のみ動作する
        displayAlert(2);
        form.reset();
      }
    },
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

  const form = useZodForm(
    {
      id: '-1',
    },
    privacyBeaconEditUserSchema,
  );

  if (errorUsers) return <Error message='ユーザ情報取得失敗' />;
  return (
    <div>
      {loading && <LoadingOverlay visible overlayProps={{ blur: 3 }} />}
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

          {error && error.status === 409 && (
            <Alert title='失敗' color='red'>
              登録済みのビーコンです
            </Alert>
          )}
          {error && error.status !== 409 && (
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
