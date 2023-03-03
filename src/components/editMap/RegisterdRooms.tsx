import { RegisterdRoom } from "@/components/editMap/RegisterdRoom";
import { Building, DBRoom } from "@/types/roomFloormap";





export const RegisterdRooms = (props: {
    editingPolygon:number[][],
    editingRoomId: number,
    currentSelectedBuildingIndex: number,
    rooms: DBRoom[],
    buildings: Building[],
    setEditingPolygon: React.Dispatch<React.SetStateAction<number[][]>>,
    setEditingRoomId: React.Dispatch<React.SetStateAction<number>>,
    setIsEditingRoom: React.Dispatch<React.SetStateAction<boolean>>,
    storeRoomToDatabase: (roomId: number, newRoomName: string) => void,
    updateMouseOutRoomColor: (roomID: number) => void,
    updateMouseOverRoomColor: (roomID: number) => void,
    updateCurrentSelectedBuildingIndexByBuildingId: (buildingId:number) => void,
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
                            building = {props.buildings[props.currentSelectedBuildingIndex]}
                            storeRoomToDatabase = {props.storeRoomToDatabase}
                            updateMouseOverRoomColor={props.updateMouseOverRoomColor}
                            updateMouseOutRoomColor={props.updateMouseOutRoomColor}
                            updateCurrentSelectedBuildingIndexByBuildingId={props.updateCurrentSelectedBuildingIndexByBuildingId}
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