import { Button } from '@mantine/core';

interface EditUserFormActionsProps {
  onCancelled: () => void;
  onDeleteClicked: () => void;
}

export default function EditUserFormActions({
  onCancelled,
  onDeleteClicked,
}: EditUserFormActionsProps) {
  return (
    <div className='flex pt-3'>
      <div className='mr-auto space-x-4'>
        <Button type='submit' className='bg-staywatch-accent' color='#1e5266'>
          保存
        </Button>
        <Button
          type='button'
          variant='outline'
          className='border-2'
          color='gray'
          onClick={onCancelled}
        >
          中止
        </Button>
      </div>
      <div>
        <Button type='button' className='bg-red-400' color='red' onClick={onDeleteClicked}>
          削除
        </Button>
      </div>
    </div>
  );
}
