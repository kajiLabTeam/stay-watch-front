import { TextInput, MultiSelect, Select } from '@mantine/core';
import { Button } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useEffect } from 'react';
import { schema } from './roles/shema';
import { useSelectBeacons } from '@/features/admin/user/hooks/beaconSelector';
import { useRoles } from '@/features/admin/user/hooks/editingUserState';
import { useSelectTags } from '@/features/admin/user/hooks/tagSelector';
import { useUserAdminFormMutators } from '@/features/admin/user/hooks/useUserAdminForm';

export const CreateUserForm = () => {
  const selectBeacons = useSelectBeacons();
  const selectTags = useSelectTags();
  const roles = useRoles();

  const { createUser } = useUserAdminFormMutators();

  const form = useForm({
    initialValues: {
      name: '',
      uuid: '',
      email: '',
      role: 1,
      communityId: 2,
      beaconName: '',
      tagIds: [],
    },
    validate: zodResolver(schema),
  });

  useEffect(() => {
    if (form.values.beaconName === 'FCS1301') {
      form.setValues({ uuid: '' });
    } else {
      // 00000にしておかないと見えない入力欄だがバリデーションで引っ掛かってしまう
      form.setValues({ uuid: '00000' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.beaconName, form.setValues]);

  return (
    <div>
      <div className='rounded-lg bg-slate-200'>
        <h1 className='pt-4 text-center text-3xl font-bold text-slate-800'>新規登録</h1>
        <form
          className=' flex flex-col px-10 py-4'
          onSubmit={form.onSubmit((values) => {
            createUser(values, form);
          })}
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
            placeholder='タグを選択してください'
            data={selectTags}
            {...form.getInputProps('tagIds')}
          />
          <div className='pt-3'>
            <Button type='submit' className='bg-blue-400' color='blue'>
              登録する
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
