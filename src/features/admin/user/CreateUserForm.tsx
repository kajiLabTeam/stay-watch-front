import { TextInput, MultiSelect, Select, Alert } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { schema } from './roles/shema';
import { Button } from '@/components/common/Button';
import { useSelectBeacons } from '@/features/admin/user/hooks/beaconSelector';
import { useSelectTags } from '@/features/admin/user/hooks/tagSelector';

import { endpoints } from '@/utils/api';

export const CreateUserForm = () => {
  const selectBeacons = useSelectBeacons();
  const selectTags = useSelectTags();
  const [isDisplayAlert, setIsDisplayAlert] = useState(false);

  const roles = [
    { value: 1, label: '一般ユーザ' },
    { value: 2, label: '研究室管理者' },
  ];

  const form = useForm({
    initialValues: {
      name: '',
      uuid: '',
      email: '',
      role: 1,
      communityId: 1,
      beaconName: '',
      tagIds: [],
    },
    validate: zodResolver(schema),
  });

  useEffect(() => {
    if (form.values.beaconName === 'FCS1301') {
      form.setValues({ uuid: '' });
    } else {
      form.setValues({ uuid: '00000' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.beaconName, form.setValues]);

  const displayTimer = () => {
    setIsDisplayAlert(true);
    setTimeout(() => {
      setIsDisplayAlert(false);
    }, 2000);
  };

  return (
    <div className='mx-5'>
      {isDisplayAlert && (
        <Alert title='成功' color='green'>
          正常に登録されました
        </Alert>
      )}
      <div className='rounded-lg bg-slate-200'>
        <form
          className=' flex flex-col gap-2 px-10 py-4'
          onSubmit={form.onSubmit((values) =>
            axios
              .post(endpoints.users2, values)
              .then(() => {
                displayTimer();
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
          <div className=' mx-auto'>
            <Button color='blue'>登録する</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
