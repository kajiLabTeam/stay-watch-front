import { Alert, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CreateUserForm } from '@/features/admin/user/CreateUserForm';
import { RegisterdUsers } from '@/features/admin/user/RegisterdUsers';
import { useAlertModeState } from '@/features/admin/user/hooks/alertModeState';
import { useLoadingState } from '@/features/admin/user/hooks/loadingState';

export const EditUser = () => {
  const { alertMode } = useAlertModeState();
  const { isLoading } = useLoadingState();
  const [visible] = useDisclosure(true);

  return (
    <div>
      {isLoading === true && <LoadingOverlay visible={visible} overlayBlur={2} />}
      <div className='flex'>
        <div className='mx-5 w-full'>
          <CreateUserForm />
          <div className='my-4 border' />
          {alertMode === 1 && (
            <Alert title='成功' color='green'>
              1名のユーザが新しく登録されました
            </Alert>
          )}
          {alertMode === 2 && (
            <Alert title='成功' color='green'>
              1名のユーザ情報が更新されました
            </Alert>
          )}
          {alertMode === 3 && (
            <Alert title='成功' color='green'>
              1名のユーザが削除されました
            </Alert>
          )}
          <RegisterdUsers />
        </div>
      </div>
    </div>
  );
};

export default EditUser;
