import { TextInput, MultiSelect, Select } from '@mantine/core';
import { Button } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
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

  const { setEditingUserId } = useEditingUserMutators();

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
      <div className='rounded-lg bg-slate-200'>
        <h1 className='pt-2 text-center text-3xl font-bold text-slate-800'>{props.user.name}</h1>
        <form
          className=' flex flex-col px-10 pb-4'
          onSubmit={form.onSubmit((values) =>
            // console.log(values)
            axios
              .put(endpoints.users2, values)
              .then(() => {
                window.alert('成功しました');
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
            label='Gメールアドレス'
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
            <TextInput label='UUID(5文字)' placeholder='UUID' {...form.getInputProps('uuid')} />
          )}
          <MultiSelect
            label='タグ'
            placeholder='属性を選択してください'
            data={selectTags}
            {...form.getInputProps('tagIds')}
          />
          <div className='mx-auto space-x-4  pt-3'>
            <Button type='submit' className='bg-blue-400' color='blue'>
              保存する
            </Button>
            <Button
              type='button'
              className='bg-red-400'
              color='red'
              onClick={() => setEditingUserId(-1)}
            >
              中止
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
