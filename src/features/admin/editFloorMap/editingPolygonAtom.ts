// atoms.ts
import axios from 'axios';
import { atom, useRecoilValue } from 'recoil';
import { useCustomSWR } from '@/hooks/useCustomSWR';
import { DBRoom, Building } from '@/types/roomFloormap';
import { endpoints } from '@/utils/api';
import '@/hooks/selectUsersHook';

const editingPolygonAtom = atom({
  key: 'editingPolygon',
  default: [
    [0, 0],
    [1, 1],
  ],
});

export const useEditingPolygonState = () => {
  return useRecoilValue(editingPolygonAtom);
};

export const useEditingPolygonMutators = () => {
  const { data: rooms } = useCustomSWR<DBRoom[]>(`${endpoints.getRoomsEditorByCommunityID}`);
  const { data: buildings } = useCustomSWR<Building[]>(`${endpoints.getBuildingsEditor}`);
  const editingPolygon = useEditingPolygonState();

  const storeRoomToDatabase = (roomId: number, newRoomName: string) => {
    if (editingPolygon && rooms && buildings) {
      const IndexNumber: number = rooms?.findIndex((room) => room.roomID === roomId);

      let newRoom: UpdaterupRoom = {
        roomID: -1,
        room_name: rooms[IndexNumber].room_name,
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
};
