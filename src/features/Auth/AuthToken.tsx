import 'tailwindcss/tailwind.css';
import { FC, ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import NotLogin from '@/components/common/NotLogin';
import { auth } from '@/utils/firebase';

type Props = {
  children: ReactNode;
};

const AuthToken: FC<Props> = ({ children }) => {
  const [user] = useAuthState(auth);

  return <div>{user ? <>{children}</> : <NotLogin />}</div>;
};

export default AuthToken;
