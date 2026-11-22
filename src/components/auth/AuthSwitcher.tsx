import { FC, ReactNode } from 'react';
import Loading from '@/components/common/Loading';
import NotLogin from '@/components/common/NotLogin';
import { useIsSignedState } from '@/atoms/firebaseUserAtom';

type Props = {
  children: ReactNode;
};

export default function AuthSwitcher({ children }: Props) {
  const isSigned = useIsSignedState();

  if (isSigned === undefined) {
    return <Loading message='認証中' />;
  }

  return isSigned ? <>{children}</> : <NotLogin />;
}
