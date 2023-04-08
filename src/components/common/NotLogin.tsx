import { FaSignInAlt } from 'react-icons/fa';
import { login } from '@/utils/Auth';

const NotLogin = () => {
  return (
    <div className='flex h-screen w-full items-center '>
      <button
        className='mx-auto mb-14 flex items-center rounded-md bg-slate-500 p-4 text-4xl text-white hover:opacity-90'
        onClick={login}
      >
        <FaSignInAlt className='mr-2' />
        <div>Sign in with Google</div>
      </button>
    </div>
  );
};
export default NotLogin;
