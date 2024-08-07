"use client"
import { Alert } from '@mantine/core';
import { CreateUserForm } from '@/features/admin/editUser/components/CreateUserForm';
import { RegisterdUsers } from '@/features/admin/editUser/components/RegisterdUsers';
import { useAlertModeState } from '@/features/admin/editUser/globalState/alertModeState';

export const EditUser = () => {
  const { alertMode } = useAlertModeState();

  return (
    <div>
      <div className='flex'>
        <div className='mx-5 w-full'>
          <CreateUserForm />
          <div className='my-4 border' />
          {alertMode > 0 && (
            <Alert title='成功' color='green'>
              {alertMode === 1 && '1名のユーザが新しく登録されました'}
              {alertMode === 2 && '1名のユーザ情報が更新されました'}
              {alertMode === 3 && '1名のユーザが削除されました'}
            </Alert>
          )}
          <RegisterdUsers />
        </div>
      </div>
    </div>
  );
};

export default EditUser;
