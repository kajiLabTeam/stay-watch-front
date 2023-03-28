import axios from 'axios';
import { useState } from 'react';
import { BuildingSelector } from '@/features/admin/editFloorMap/BuildingSelector';
import { MapCanvas } from '@/features/admin/editFloorMap/MapCanvas';
import { RegisterdRooms } from '@/features/admin/editFloorMap/RegisterdRooms';
import { useRoomMapData } from '@/features/admin/editFloorMap/useUpdateMapData';
import { useCustomSWR } from '@/hooks/useCustomSWR';
import { DBRoom, UpdaterRoom, Building } from '@/types/roomFloormap';
import { useUserRole } from '@/utils/Auth';
import { endpoints } from '@/utils/api';
import '@/hooks/selectUsersHook';

export const EditFloorMap = () => {
  const userRole = useUserRole();
  const { data: rooms } = useCustomSWR<DBRoom[]>(`${endpoints.getRoomsEditorByCommunityID}`);
  const { data: buildings } = useCustomSWR<Building[]>(`${endpoints.getBuildingsEditor}`);
  const [editingPolygon, setEditingPolygon] = useState([
    [0, 0],
    [1, 1],
  ]);
  const [editingRoomId, setEditingRoomId] = useState(0);
  const [isEditingRoom, setIsEditingRoom] = useState(false);
  const [currentSelectedBuildingIndex, setCurrentSelectedBuildingIndex] = useState(0);
  const { mapsData, updateMouseOutRoomColor, updateMouseOverRoomColor } = useRoomMapData(
    rooms,
    buildings,
    currentSelectedBuildingIndex,
  );

  const updateCurrentSelectedBuildingIndexByBuildingId = (buildingId: number) => {
    if (buildings) {
      for (let i = 0; i < buildings.length; i++) {
        if (buildings[i].buildingId == buildingId) {
          setCurrentSelectedBuildingIndex(i);
        }
      }
    }
  };

  const storeRoomToDatabase = (roomId: number, newRoomName: string) => {
    if (editingPolygon && rooms && buildings) {
      const index_number: number = rooms?.findIndex((room) => room.roomID == roomId);

      let newRoom: UpdaterRoom = {
        roomID: -1,
        room_name: rooms[index_number].room_name,
        polygon: '',
        buildingID: -1,
      };

      newRoom = {
        roomID: roomId,
        room_name: newRoomName,
        polygon:
          editingPolygon[0][0] +
          ',' +
          editingPolygon[0][1] +
          '-' +
          editingPolygon[1][0] +
          ',' +
          editingPolygon[1][1],
        buildingID: buildings[currentSelectedBuildingIndex].buildingId,
      };

      axios
        .post(endpoints.updateroom, newRoom)
        .then(() => {
          // 例 : {roomID: 3, room_name: '院生部', polygon: '200,200-300,300', buildingID: 2}
          window.alert('成功しました');
        })
        .catch((err) => {
          console.log(err);
          window.alert('失敗しました');
        });
    } else {
      window.alert('失敗しました');
    }
  };

  if (userRole == null) {
    return <div />;
  }

  return (
    <div>
      <div className='flex'>
        <div className='w-3/4'>
          <BuildingSelector
            buildings={buildings}
            currentSelectedBuildingIndex={currentSelectedBuildingIndex}
            setCurrentSelectedBuildingIndex={setCurrentSelectedBuildingIndex}
          />
          <MapCanvas
            mapsdata={mapsData}
            editingPolygon={editingPolygon}
            isEditingRoom={isEditingRoom}
            buildingImagePath={buildings[currentSelectedBuildingIndex].buildingImagePath}
            currentSelectedBuildingId={buildings[currentSelectedBuildingIndex].buildingId}
            setEditingPolygon={setEditingPolygon}
          />
        </div>

        <div className='mt-10 w-1/4 rounded-lg border border-red-500'>
          <RegisterdRooms
            rooms={rooms}
            buildings={buildings}
            storeRoomToDatabase={storeRoomToDatabase}
            updateMouseOverRoomColor={updateMouseOverRoomColor}
            updateMouseOutRoomColor={updateMouseOutRoomColor}
            updateCurrentSelectedBuildingIndexByBuildingId={
              updateCurrentSelectedBuildingIndexByBuildingId
            }
            editingPolygon={editingPolygon}
            editingRoomId={editingRoomId}
            currentSelectedBuildingIndex={currentSelectedBuildingIndex}
            setEditingRoomId={setEditingRoomId}
            setIsEditingRoom={setIsEditingRoom}
            setEditingPolygon={setEditingPolygon}
          />
        </div>
      </div>
    </div>
  );
};

export default EditFloorMap;
