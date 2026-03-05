'use client';
import { Alert } from '@mantine/core';
import Error from '@/components/common/Error';
import { CreateUserForm } from '@/features/admin/editUser/components/CreateUserForm';
import { RegisterdUsers } from '@/features/admin/editUser/components/RegisterdUsers';
import { useAlertModeState } from '@/features/admin/editUser/globalState/alertModeState';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { useGetAPI } from '@/hooks/useGetAPI';
import { BeaconType } from '@/types/beacon';
import { UserEditor } from '@/types/user';
import { endpoints } from '@/utils/endpoint';

export const EditUser = () => {
  const { alertMode } = useAlertModeState();
  const community = useCommunityState();
  const { data: users, error: usersError } = useGetAPI<UserEditor[]>(
    `${endpoints.adminUsers}/${community.communityId}`,
  );
  const { data: beaconTypes, error: beaconTypesError } = useGetAPI<BeaconType[]>(
    `${endpoints.beacons}`,
  );

  if (usersError) return <Error message='ユーザ情報取得失敗' />;
  if (beaconTypesError) return <Error message='ビーコン情報取得失敗' />;
  if (users && beaconTypes) {
    return (
      <div>
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
      </div>
    );
  }
};

export default EditUser;
