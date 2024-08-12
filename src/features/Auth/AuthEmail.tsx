'use client';
import { FC, ReactNode } from 'react';
import Loading from '@/components/common/Loading';
import { useIsRegisterEmail } from '@/utils/Auth';

type Props = {
  children: ReactNode;
};

const AuthEmail: FC<Props> = ({ children }) => {
  const isRegisteredEmail = useIsRegisterEmail();
  if (isRegisteredEmail === undefined) {
    return <Loading message='権限確認中' />;
  }
  return isRegisteredEmail ? (
    <div>{children}</div>
  ) : (
    <div>管理者にメールアドレスを登録してもらう必要があります</div>
  );
};

export default AuthEmail;
