import { TextInput, MultiSelect, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { Button } from '@/components/common/Button';
import { useSelectBeacons } from '@/features/admin/user/hooks/beaconSelector';
import { useSelectTags } from '@/features/admin/user/hooks/tagSelector';

import { endpoints } from '@/utils/api';


export const CreateUserForm = () => {
  //   const { storeRoomToDatabase } = useEditingMapMutators();
  //   const [roomNameValue, setRoomNameValue] = useState(props.room.roomName);
  const selectBeacons = useSelectBeacons();
  const selectTags = useSelectTags();

  const roles=[
    {value:1, label:"一般ユーザ"},
    {value:2, label:"研究室管理者"}
  ]

  const form = useForm({
    initialValues: {
      name:"",
      uuid:"",
      email:"",
      role:1,
      communityId:1,
      beaconName:"",
      tagIds  :[]
    },
    validate: {
      email: (value) => (/^\S+@gmail\S+$/.test(value) ? null : 'Invalid email'),
      name: (value) => (value ? null : 'Invalid user'),
    },
  });

  return (
    <div className='border border-green-500'>
    <div className='rounded-lg bg-slate-200'>
      <form
        className=' flex flex-col gap-6 p-10'
        onSubmit={form.onSubmit((values) =>
          // console.log(values)
          axios
            .post(endpoints.users2, values)
            .then(() => {
              window.alert('成功しました');
            })
            .catch((err) => {
              if(err.response.status === 409){
                window.alert('このメールアドレスは既に登録されています');
              }
              else {
                window.alert('失敗しました');
              }
              console.error(err.response.status);
            }),
        )}
      >
        <TextInput
          placeholder='tarou'
          label='名前'
          required
          {...form.getInputProps('name')}
        />
        <TextInput
          label='Gメールアドレス'
          placeholder='your@gmail.com'
          required
          {...form.getInputProps('email')}
        />
        <div className="flex space-x-4">
          <Select
            className='w-1/2'
            label='ビーコンの形態'
            placeholder='ビーコンの形態を選択してください'
            data={selectBeacons}
            required
            {...form.getInputProps('beaconName')}
          />
          <Select
            label='権限'
            className='w-1/2'
            placeholder='権限レベルを選択してください'
            data={roles}
            required
            {...form.getInputProps('role')}
           />
        </div>
        {form.values.beaconName === "FCS1301" && (
          <TextInput
            label='UUID'
            placeholder='UUID'
            required
            {...form.getInputProps('uuid')}
          />
        ) }
        <MultiSelect
          label='タグ'
          placeholder='属性を選択してください'
          data={selectTags}
          required
          {...form.getInputProps('tagIds')}
        />
        <div className=' mx-auto'>
          <Button color='blue'>登録する</Button>
        </div>
      </form>
    </div>
  </div>
  )
};
