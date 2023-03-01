import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Button } from "@/components/common/Button";
import { useUserRole } from "@/utils/Auth";




export const RoomEditorForm = (props: any) => {
  const userRole = useUserRole();

  const form = useForm({
    initialValues: {
      roomName: props.roomName
    },
    // validate: {
    //   email: (value) => (/^\S+@gmail\S+$/.test(value) ? null : "Invalid email"),
    //   id: (value) => (value ? null : "Invalid user"),
    //   role: (value) => (value ? null : "Invalid user"),
    // },
  });

  

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
              props.storeRoomToDatabase(props.room.roomID ,values.roomName)
            })
          }
        >
            
          <TextInput
              placeholder="部屋名"
              defaultValue={props.room.room_name}
              required
              {...form.getInputProps("roomName")}
          />
          <div className="mx-auto bg-red-300">
            <Button>保存</Button>
          </div>

        </form>
      </div>
    </div>
  );
};