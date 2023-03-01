import { RegisterdRoom } from "@/components/editMap/RegisterdRoom";
import { Room } from "@/types/roomFloormap";





export const RegisterdRooms = (props: any) => {

    if (!props.rooms) return <div>loading...</div>;

    return (
        <div>
            <p>Rooms</p>
            {props.rooms.map((room: Room) => {
                return (
                    <div key={room.roomID}>
                        <RegisterdRoom
                            room = {room}
                            storeRoomToDatabase = {props.storeRoomToDatabase}
                            updateMouseOverRoomColor={props.updateMouseOverRoomColor}
                            updateMouseOutRoomColor={props.updateMouseOutRoomColor}
                            setColor = {props.setColor}
                            editingPolygon = {props.editingPolygon}
                            editingRoomId = {props.editingRoomId}
                            setEditingRoomId = { props.setEditingRoomId }
                            setIsEditingRoom = {props.setIsEditingRoom}
                            setEditingPolygon = {props.setEditingPolygon}
                        />
                    </div>
                );
            })}
        </div>
    );
};