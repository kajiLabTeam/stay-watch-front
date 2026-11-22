import { Alert } from '@mantine/core';
import { ApiError } from '@/utils/api';

const CONFLICT_STATUS = 409;

interface RequestErrorAlertProps {
  error: ApiError | null;
  conflictMessage: string;
}

export default function RequestErrorAlert({ error, conflictMessage }: RequestErrorAlertProps) {
  if (!error) return null;

  return (
    <Alert title='失敗' color='red'>
      {error.status === CONFLICT_STATUS ? conflictMessage : 'エラーが発生しました'}
    </Alert>
  );
}
