import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { Button } from "@/components/common/Button";
import { DBRoom } from "@/types/roomFloormap";
import { useUserRole } from "@/utils/Auth";


export const RoomEditorForm = (props:{
  room:DBRoom,
  storeRoomToDatabase:any,
  editingPolygon:number[][]
}) => {

  const userRole = useUserRole();
  const [roomNameValue, setRoomNameValue] = useState(props.room.room_name);

  const form = useForm();

  const handleChange = (e:any) => {
    setRoomNameValue(e.target.value)
  }

  

  if (userRole == null) {
    return <div />;
  }


  return (
    <div className="border border-green-500">
      <div className="rounded-lg bg-slate-200">

        <form
          className=" flex flex-col gap-6 p-10"
          onSubmit={
            form.onSubmit((values) => {
              props.storeRoomToDatabase(props.room.roomID ,roomNameValue)
            })
          }
        >
          <TextInput
              placeholder="部屋名"
              value={roomNameValue}
              onChange={handleChange}
          />
          <div className="mx-auto bg-red-300">
            <Button>保存</Button>
          </div>
        </form>
      </div>
    </div>
  );
};