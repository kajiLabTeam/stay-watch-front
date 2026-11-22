import { Button, LoadingOverlay, Select } from '@mantine/core';
import { useZodForm } from '@/hooks/useZodForm';
import { ApiError, fetchApi } from '@/utils/api';
import { useMutation } from '@tanstack/react-query';
import { UI_DATA } from '@/pages/Beacon/constants/uidata';
import { useAlertModeMutators } from '@/atoms/alertModeAtom';
import { privacyBeaconEditUserSchema } from '@/pages/Beacon/validation/privacyBeaconEditUserSchema';
import Error from '@/components/common/Error';
import RequestErrorAlert from '@/components/common/RequestErrorAlert';
import { useUserState } from '@/atoms/firebaseUserAtom';
import { useCommunityState } from '@/atoms/communityAtom';
import { useGetAPI } from '@/hooks/useGetAPI';
import { UpdatePrivateBeaconUserRequest } from '@/types/request';
import { User } from '@/types/user';
import { ENDPOINTS } from '@/utils/endpoint';

type UsersSelectData = {
  label: string;
  value: string;
};

type PropsType = {
  privateKey: string;
};

export default function BeaconEditUserForm({ privateKey }: PropsType) {
  const { setAlertMode } = useAlertModeMutators();
  const community = useCommunityState();
  const firebaseUser = useUserState();
  const { data: users, error: errorUsers } = useGetAPI<User[]>(
    community ? `${ENDPOINTS.users}/${community.communityId}` : null,
  );
  const usersSelecter: UsersSelectData[] =
    users?.map((user) => ({ label: user.name, value: String(user.id) })) ?? [];
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
      if (!firebaseUser) return;

      let updateUserRequest: UpdatePrivateBeaconUserRequest = {
        id: parseInt(values.id),
        beaconName: UI_DATA.BEACON_NAME_PRIVBEACON,
        privateKey: privateKey,
      };
      await fetchApi(ENDPOINTS.users, { method: 'PUT', body: updateUserRequest });

      // これより下は成功した時のみ動作する
      displayAlert(2);
      form.reset();
    },
  });

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

        <RequestErrorAlert error={error} conflictMessage='登録済みのビーコンです' />
      </form>
    </div>
  );
}
