import { TextInput, MultiSelect, Select, LoadingOverlay, Alert } from '@mantine/core';
import { Button } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { schema } from './roles/shema';
import { useSelectBeacons } from '@/features/admin/user/hooks/beaconSelector';
import { useRoles } from '@/features/admin/user/hooks/editingUserState';
import { useSelectTags } from '@/features/admin/user/hooks/tagSelector';

import { endpoints } from '@/utils/api';

export const CreateUserForm = () => {
  const selectBeacons = useSelectBeacons();
  const selectTags = useSelectTags();
  const [isDisplayAlert, setIsDisplayAlert] = useState(false);
  const roles = useRoles();
  const [visible] = useDisclosure(true);
  const [isLoading, setIsLoading] = useState(false);

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
      form.setValues({ uuid: '00000' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.beaconName, form.setValues]);

  const displaySuccessMessage = () => {
    setIsDisplayAlert(true);
    setTimeout(() => {
      setIsDisplayAlert(false);
    }, 2000);
  };

  return (
    <div>
      {isLoading === true && <LoadingOverlay visible={visible} overlayBlur={2} />}
      {isDisplayAlert && (
        <Alert title='成功' color='green'>
          正常に登録されました
        </Alert>
      )}
      <div className='rounded-lg bg-slate-200'>
        <h1 className='pt-4 text-center text-3xl font-bold text-slate-800'>新規登録</h1>
        <form
          className=' flex flex-col px-10 py-4'
          onSubmit={form.onSubmit((values) => {
            setIsLoading(true);
            axios
              .post(endpoints.users2, values)
              .then(() => {
                displaySuccessMessage();
                //window.alert('新しいユーザが登録されました');
                form.reset();
              })
              .catch((err) => {
                if (err.response.status === 409) {
                  window.alert('このメールアドレスは既に登録されています');
                } else {
                  window.alert('失敗しました');
                }
                console.error(err.response.status);
              })
              .finally(() => {
                setIsLoading(false);
              });
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
