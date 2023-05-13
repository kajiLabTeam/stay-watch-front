import { TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { useEditingMapMutators } from '@/features/admin/editFloorMap/globalstate/editingMapState';
import { Building, EditorRoom } from '@/types/roomFloormap';

export const RoomEditorForm = (props: {
  room: EditorRoom;
  building: Building;
  editingPolygon: number[][];
}) => {
  const { storeRoomToDatabase } = useEditingMapMutators();
  const [roomNameValue, setRoomNameValue] = useState(props.room.roomName);

  const form = useForm();

  return (
    <div className='border border-green-500'>
      <div className='rounded-lg bg-slate-200'>
        <form
          className=' flex flex-col gap-6 p-10'
          onSubmit={form.onSubmit(() => {
            storeRoomToDatabase(props.room.roomId, roomNameValue);
          })}
        >
          <TextInput
            placeholder='部屋名'
            value={roomNameValue}
            onChange={(e) => setRoomNameValue(e.target.value)}
          />
          <div>{props.building.buildingName}</div>
          <div className='mx-auto bg-red-300'>
            <Button color='blue'>保存</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
