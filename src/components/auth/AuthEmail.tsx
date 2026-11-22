import { ReactNode } from 'react';
import AuthEmailError from './AuthEmailError';
import Loading from '@/components/common/Loading';
import { useIsRegisterEmail } from '@/hooks/useIsRegisterEmail';

interface AuthEmailProps {
  children: ReactNode;
}

export default function AuthEmail({ children }: AuthEmailProps) {
  const { isRegisteredEmail, status } = useIsRegisterEmail();

  // 権限確認(check)で存在を確認できてから子を表示する
  if (isRegisteredEmail === undefined) return <Loading message='権限確認中' />;
  if (!isRegisteredEmail) return <AuthEmailError status={status} />;

  return <>{children}</>;
}
