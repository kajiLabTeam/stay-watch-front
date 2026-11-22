import { statusCode } from '@/utils/statusCode';

interface AuthEmailErrorProps {
  status: number;
}

export default function AuthEmailError({ status }: AuthEmailErrorProps) {
  if (status === statusCode.UNREGISTERED_MAIL_ADDRESS) {
    return <div>管理者にメールアドレスを登録してもらう必要があります</div>;
  }
  return <div>サーバーエラー</div>;
}
