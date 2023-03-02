import { RegisterdRoom } from "@/components/editMap/RegisterdRoom";
import { DBRoom } from "@/types/roomFloormap";





export const RegisterdRooms = (props: {
    editingPolygon:number[][],
    editingRoomId: number,
    rooms: DBRoom[],
    setEditingPolygon: React.Dispatch<React.SetStateAction<number[][]>>,
    setEditingRoomId: React.Dispatch<React.SetStateAction<number>>,
    setIsEditingRoom: React.Dispatch<React.SetStateAction<boolean>>,
    storeRoomToDatabase: (roomId: number, newRoomName: string) => void,
    updateMouseOutRoomColor: (roomID: number) => void,
    updateMouseOverRoomColor: (roomID: number) => void,
}) => {

    if (!props.rooms) return <div>loading...</div>;

    return (
        <div>
            <p>Rooms</p>
            {props.rooms.map((room: DBRoom) => {
                return (
                    <div key={room.roomID}>
                        <RegisterdRoom
                            room = {room}
                            storeRoomToDatabase = {props.storeRoomToDatabase}
                            updateMouseOverRoomColor={props.updateMouseOverRoomColor}
                            updateMouseOutRoomColor={props.updateMouseOutRoomColor}
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