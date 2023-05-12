import 'tailwindcss/tailwind.css';
import { FC, ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import NotLogin from '@/components/common/NotLogin';
//import { useIsSigned } from '@/utils/Auth';
import { auth } from '@/utils/firebase';

type Props = {
  children: ReactNode;
};

const AuthToken: FC<Props> = ({ children }) => {
  //const isSigned = useIsSigned();
  const [user] = useAuthState(auth);
  //const { isLogined, setIsLogined } = useState(false);

  return <div>{user ? <>{children}</> : <NotLogin />}</div>;

  // if (isSigned === undefined) {
  //   return <></>;
  // }

  // return isSigned ? <>{children}</> : <NotLogin />;
  // return isLogined ? <>{children}</> : <NotLogin />;
};

export default AuthToken;
