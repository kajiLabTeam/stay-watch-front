import { CreateUserForm } from '@/features/admin/user/CreateUserForm';

export const EditUser = () => {

  return (
    <div>
      <div className='flex'>
        <div className='w-full'>
          <CreateUserForm />
        </div>
      </div>
    </div>
  );
};

export default EditUser;
