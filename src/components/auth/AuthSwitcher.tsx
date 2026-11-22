import { FC, ReactNode } from 'react';
import Loading from '@/components/common/Loading';
import NotLogin from '@/components/common/NotLogin';
import { useIsSignedState } from '@/atoms/firebaseUserAtom';

type Props = {
  children: ReactNode;
};

const AuthSwitcher: FC<Props> = ({ children }) => {
  const isSigned = useIsSignedState();

  if (isSigned === undefined) {
    return <Loading message='認証中' />;
  }

  return isSigned ? <>{children}</> : <NotLogin />;
};

export default AuthSwitcher;
