'use client';
import { FC, ReactNode } from 'react';
import Loading from '@/components/common/Loading';
import { useIsRegisterEmail } from '@/utils/Auth';
import { statusCode } from '@/utils/statusCode';

type Props = {
  children: ReactNode;
};

const AuthEmail: FC<Props> = ({ children }) => {
  const { isRegisteredEmail, status } = useIsRegisterEmail();
  if (isRegisteredEmail === undefined) {
    return <Loading message='権限確認中' />;
  }
  if (!isRegisteredEmail) {
    if (status === statusCode.UNREGISTERED_MAIL_ADDRESS) {
      return <div>管理者にメールアドレスを登録してもらう必要があります</div>;
    }
    return <div>サーバーエラー</div>;
  }
  return <div>{children}</div>;
};

export default AuthEmail;
