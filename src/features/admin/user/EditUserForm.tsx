import { TextInput, MultiSelect, Select } from '@mantine/core';
import { Button, Modal } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { schema } from './hooks/shema';
import { useSelectBeacons } from '@/features/admin/user/hooks/beaconSelector';
import { useRoles, useTagIds } from '@/features/admin/user/hooks/editingUserState';
import { useEditingUserMutators } from '@/features/admin/user/hooks/editingUserState';
import { useSelectTags } from '@/features/admin/user/hooks/tagSelector';
import { UserEditor } from '@/types/user';

import { endpoints } from '@/utils/api';

export const EditUserForm = (props: { user: UserEditor }) => {
  const selectBeacons = useSelectBeacons();
  const selectTags = useSelectTags();
  const currentTagIds = useTagIds(props.user.tags);
  const roles = useRoles();
  const [opened, { open, close }] = useDisclosure(false);

  const { setEditingUserId, deleteUser } = useEditingUserMutators();

  const form = useForm({
    initialValues: {
      id: props.user.id,
      name: props.user.name,
      uuid: props.user.uuid.slice(-5),
      email: props.user.email,
      role: props.user.role,
      communityId: 2,
      beaconName: props.user.beaconName,
      tagIds: currentTagIds,
    },
    validate: zodResolver(schema),
  });

  return (
    <div>
      <Modal opened={opened} onClose={close} title='削除確認'>
        <div className='my-4 border' />
        <div>ユーザ情報を削除しますか？</div>
        <div className='my-4 border' />
        <div className='space-x-4 pt-4 text-right'>
          <Button type='button' variant='outline' color='gray' onClick={close}>
            キャンセル
          </Button>
          <Button
            type='button'
            className='bg-red-400'
            color='red'
            onClick={() => deleteUser(props.user.id)}
            //onClick={() => console.log('デリートだよ')}
          >
            削除する
          </Button>
        </div>
      </Modal>
      <div className='rounded-lg bg-slate-200 px-10 pb-4'>
        <h1 className='pt-2 text-left text-2xl text-slate-800'>{props.user.name}</h1>
        <form
          className=' flex flex-col'
          onSubmit={form.onSubmit((values) =>
            // console.log(values)
            axios
              .put(endpoints.users2, values)
              .then(() => {
                window.alert('成功しました');
                setEditingUserId(-1);
              })
              .catch((err) => {
                if (err.response.status === 409) {
                  window.alert('このメールアドレスは既に登録されています');
                } else {
                  window.alert('失敗しました');
                }
                console.error(err.response.status);
              }),
          )}
        >
          <TextInput placeholder='tarou' label='名前' {...form.getInputProps('name')} />
          <TextInput
            label='Gメールアドレス（任意）'
            placeholder='your@gmail.com'
            {...form.getInputProps('email')}
          />
          <div className='flex space-x-4'>
            <Select
              className='w-1/2'
              label='ビーコンの形態'
              placeholder='ビーコンの形態を選択してください'
              data={selectBeacons}
              {...form.getInputProps('beaconName')}
            />
            <Select
              label='権限'
              className='w-1/2'
              placeholder='権限レベルを選択してください'
              data={roles}
              {...form.getInputProps('role')}
            />
          </div>
          {form.values.beaconName === 'FCS1301' && (
            <TextInput
              label='ビーコンのID（5文字）'
              placeholder='UUID'
              {...form.getInputProps('uuid')}
            />
          )}
          <MultiSelect
            label='タグ'
            placeholder='属性を選択してください'
            data={selectTags}
            {...form.getInputProps('tagIds')}
          />
          <div className='flex pt-3'>
            <div className='mr-auto space-x-4'>
              <Button type='submit' className='bg-blue-400' color='blue'>
                保存
              </Button>
              <Button
                type='button'
                variant='outline'
                className='border-2'
                color='gray'
                onClick={() => setEditingUserId(-1)}
              >
                中止
              </Button>
            </div>
            <div>
              <Button type='button' className='bg-red-400' color='red' onClick={open}>
                削除
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
