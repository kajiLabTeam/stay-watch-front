import { Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { Button } from '@/components/common/Button';
import { useUserRole } from '@/utils/Auth';
import { endpoints } from '@/utils/api';

export const BLEUnRegisteredForm = () => {
  const userRole = useUserRole();

  const form = useForm({
    initialValues: {
      id: 0,
      email: '',
      name: '',
      role: 1,
    },
    validate: {
      email: (value) => (/^\S+@gmail\S+$/.test(value) ? null : 'Invalid email'),
      name: (value) => (value ? null : 'Invalid user'),
      role: (value) => (value ? null : 'Invalid user'),
    },
  });

  if (userRole == null) {
    return <div />;
  }

  return (
    <form
      className=' flex flex-col gap-6 p-10'
      onSubmit={form.onSubmit((values) =>
        axios
          .post(endpoints.users, values)
          .then(() => {
            window.alert('成功しました');
          })
          .catch((err) => {
            window.alert('失敗しました');
            console.error(err);
          }),
      )}
    >
      <TextInput
        placeholder='your name'
        label='ユーザネーム'
        required
        {...form.getInputProps('name')}
      />
      <TextInput
        placeholder='your@gmail.com'
        label='Gmailアドレス'
        required
        {...form.getInputProps('email')}
      />
      <Select
        classNames={{
          label: 'md:text-md',
          input: 'w-full',
        }}
        label='ユーザロール'
        placeholder='ユーザロール'
        required
        searchable
        nothingFound='No options'
        data={[
          { label: '一般ユーザ', value: userRole - 1 },
          {
            label: '研究室管理者',
            value: userRole,
          },
        ]}
        {...form.getInputProps('role')}
      />
      <div className=' mx-auto'>
        <Button color='blue'>登録する</Button>
      </div>
    </form>
  );
};
