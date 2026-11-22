import { Alert, Button, Modal } from '@mantine/core';

interface DeleteUserModalProps {
  opened: boolean;
  hasError: boolean;
  onClosed: () => void;
  onDeleteConfirmed: () => void;
}

export default function DeleteUserModal({
  opened,
  hasError,
  onClosed,
  onDeleteConfirmed,
}: DeleteUserModalProps) {
  return (
    <Modal opened={opened} onClose={onClosed} title='削除確認'>
      <div className='my-4 border' />
      <div>ユーザ情報を削除しますか？</div>
      <div className='my-4 border' />
      <div className='space-x-4 pt-4 text-right'>
        <Button type='button' variant='outline' color='gray' onClick={onClosed}>
          キャンセル
        </Button>
        <Button type='button' className='bg-red-400' color='red' onClick={onDeleteConfirmed}>
          削除する
        </Button>
        {hasError && (
          <Alert title='失敗' color='red'>
            エラーが発生しました
          </Alert>
        )}
      </div>
    </Modal>
  );
}
