import { TextInput, MultiSelect, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Button } from '@/components/common/Button';
import { useSelectBeacons } from '@/features/admin/user/hooks/beaconSelector';
import { useSelectTags } from '@/features/admin/user/hooks/tagSelector';

export const CreateUserForm = () => {
  //   const { storeRoomToDatabase } = useEditingMapMutators();
  //   const [roomNameValue, setRoomNameValue] = useState(props.room.roomName);
  const selectBeacons = useSelectBeacons();
  const selectTags = useSelectTags();

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
            onSubmit={form.onSubmit(() => {
              console.log(form.values)
            })}
        >
          <TextInput label='名前' placeholder='名前' />
          <TextInput label='UUID' placeholder='UUID' />
          <Select
            label='ビーコンの形態'
            placeholder='ビーコンの形態を選択してください'
            data={selectBeacons}
            {...form.getInputProps('beaconName')}
          />
          <MultiSelect
            label='属性'
            placeholder='属性を選択してください'
            data={selectTags}
            {...form.getInputProps('tagIds')}
          />
          <div className='mx-auto bg-red-300'>
            <Button color='blue'>保存</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
