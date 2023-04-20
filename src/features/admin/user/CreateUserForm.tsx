import { TextInput, MultiSelect, Select } from '@mantine/core';
import { useState } from 'react';
import { Button } from '@/components/common/Button';

export const CreateUserForm = () => {
//   const { storeRoomToDatabase } = useEditingMapMutators();
//   const [roomNameValue, setRoomNameValue] = useState(props.room.roomName);
  const [userNameValue, setUserNameValue] = useState()
  const [uuidValue, setUuidValue] = useState()

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
 

  const inputUserName = (e: any) => {
    setUserNameValue(e.target.value);
  };

  const inputUuid = (e: any) => {
    setUuidValue(e.target.value);
  }

  return (
    <div className='border border-green-500'>
      <div className='rounded-lg bg-slate-200'>
        <form
          className=' flex flex-col gap-6 p-10'
        //   onSubmit={form.onSubmit(() => {
        //     storeRoomToDatabase(props.room.roomId, roomNameValue);
        //   })}
        >

          <TextInput
            label="名前"
            placeholder='名前'
            value={userNameValue}
            onChange={inputUserName}
          />
          <TextInput
            label="UUID"
            placeholder='UUID'
            value={uuidValue}
            onChange={inputUuid}
          />
          <Select
            label="ビーコンの形態"
            placeholder='ビーコンの形態を選択してください'
            data={options}
          />
          <MultiSelect
            label="属性"
            placeholder='属性を選択してください'
            data={options}
          />
          <div className='mx-auto bg-red-300'>
            <Button color='blue'>保存</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
