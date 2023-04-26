import { CreateUserForm } from '@/features/admin/user/CreateUserForm';
import { RegisterdUsers } from '@/features/admin/user/RegisterdUsers';

export const EditUser = () => {
  return (
    <div>
      <div className='flex'>
        <div className='mx-5 w-full'>
          <CreateUserForm />
          <RegisterdUsers />
        </div>
      </div>
    </div>
  );
};

export default EditUser;
