import { TextInput, MultiSelect, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Button } from '@/components/common/Button';
import { useSelectBeacons } from '@/features/admin/user/hooks/beaconSelector';

export const CreateUserForm = () => {
  //   const { storeRoomToDatabase } = useEditingMapMutators();
  //   const [roomNameValue, setRoomNameValue] = useState(props.room.roomName);
  const selectBeacons = useSelectBeacons();

  const options = [ // sample
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const form = useForm({
    initialValues: {
      name: '',
      uuid: '',
      email: '',
      role: 0,
      communityId: 0,
      beaconName: '',
      tagIds: [],
    },
  });

  return (
    <div className='border border-green-500'>
      <div className='rounded-lg bg-slate-200'>
        <form
          className=' flex flex-col gap-6 p-10'
          //   onSubmit={form.onSubmit(() => {
          //     storeRoomToDatabase(props.room.roomId, roomNameValue);
          //   })}
        >
          <TextInput label='名前' placeholder='名前' />
          <TextInput label='UUID' placeholder='UUID' />
          <Select
            label='ビーコンの形態'
            placeholder='ビーコンの形態を選択してください'
            data={selectBeacons}
            {...form.getInputProps('beaconId')}
          />
          <MultiSelect label='属性' placeholder='属性を選択してください' data={options} />
          <div className='mx-auto bg-red-300'>
            <Button color='blue'>保存</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
