'use client';
import 'tailwindcss/tailwind.css';
import { FC, ReactNode } from 'react';
import { useIsRegisterEmail } from '@/utils/Auth';

type Props = {
  children: ReactNode;
};

const AuthEmail: FC<Props> = ({ children }) => {
  const isRegisteredEmail = useIsRegisterEmail();
  if (isRegisteredEmail === undefined) {
    return <></>;
  }
  return isRegisteredEmail ? (
    <div>{children}</div>
  ) : (
    <div>管理者にメールアドレスを登録してもらう必要があります</div>
  );
};

export default AuthEmail;
