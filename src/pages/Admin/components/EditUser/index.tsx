import { Alert } from '@mantine/core';
import Error from '@/components/common/Error';
import Loading from '@/components/common/Loading';
import CreateUserForm from './CreateUserForm';
import RegisterdUsers from './RegisterdUsers';
import { useAlertModeState } from '@/atoms/alertModeAtom';
import { useCommunityState } from '@/atoms/communityAtom';
import { useGetAPI } from '@/hooks/useGetAPI';
import { BeaconType } from '@/pages/Admin/types/beacon';
import { UserEditor } from '@/types/user';
import { ENDPOINTS } from '@/utils/endpoint';

export default function EditUser() {
  const { alertMode } = useAlertModeState();
  const community = useCommunityState();
  const { data: users, error: usersError } = useGetAPI<UserEditor[]>(
    community ? `${ENDPOINTS.adminUsers}/${community.communityId}` : null,
  );
  const { data: beaconTypes, error: beaconTypesError } = useGetAPI<BeaconType[]>(ENDPOINTS.beacons);

  if (usersError) return <Error message='ユーザ情報取得失敗' />;
  if (beaconTypesError) return <Error message='ビーコン情報取得失敗' />;
  if (!users || !beaconTypes) return <Loading message='' />;
  return (
    <div className='flex'>
      <div className='mx-5 w-full'>
        <CreateUserForm beaconTypes={beaconTypes} />
        <div className='my-4 border' />
        {alertMode > 0 && (
          <Alert title='成功' color='green'>
            {alertMode === 1 && '1名のユーザが新しく登録されました'}
            {alertMode === 2 && '1名のユーザ情報が更新されました'}
            {alertMode === 3 && '1名のユーザが削除されました'}
          </Alert>
        )}
        <RegisterdUsers users={users} beaconTypes={beaconTypes} />
      </div>
    </div>
  );
}
