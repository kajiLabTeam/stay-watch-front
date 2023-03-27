import 'tailwindcss/tailwind.css';
import { FC, ReactNode } from 'react';
import NotLogin from '@/components/common/NotLogin';
import { useIsSigned } from '@/utils/Auth';

type Props = {
  children: ReactNode;
};

const AuthToken: FC<Props> = ({ children }) => {
  const isSigned = useIsSigned();

  if (isSigned === undefined) {
    return <></>;
  }

  return isSigned ? <>{children}</> : <NotLogin />;
};

export default AuthToken;
