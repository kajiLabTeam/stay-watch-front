import { Alert } from '@mantine/core';

interface BeaconSuccessAlertProps {
  alertMode: number;
}

function getMessage(alertMode: number): string | null {
  switch (alertMode) {
    case 1:
      return 'ユーザが新しく登録されました';
    case 2:
      return 'ユーザ情報が更新されました';
    case 3:
      return '1名のユーザが削除されました';
    default:
      return null;
  }
}

export function BeaconSuccessAlert({ alertMode }: BeaconSuccessAlertProps) {
  const message = getMessage(alertMode);
  if (message === null) return null;

  return (
    <Alert title='成功' color='green'>
      {message}
    </Alert>
  );
}
