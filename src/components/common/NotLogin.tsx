import { login } from '@/utils/Auth';
import SignInIcon from '../icons/SignIn';

const NotLogin = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <button
        className='flex items-center rounded-md bg-slate-500 text-4xl text-white hover:opacity-90 p-4'
        onClick={login}
      >
        <SignInIcon className='mr-2' />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
};
export default NotLogin;
