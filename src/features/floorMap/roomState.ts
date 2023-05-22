import { useState, useEffect } from 'react';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { useSuspenseSWR } from '@/hooks/useSuspenseSWR';
import { EditorRoom } from '@/types/roomFloormap';
import RoomInformation from '@/types/roomInformation';
import RoomStatus from '@/types/roomStatus';
import StayerType from '@/types/stayer';
import { endpoints } from '@/utils/api';

export const useRoomState = () => {
  const community = useCommunityState();
  const { data: rooms } = useSuspenseSWR<EditorRoom[]>(
    `${endpoints.getRoomsEditorByCommunityID}/${community.communityId}`,
  );
  const { data: stayers } = useSuspenseSWR<StayerType[]>(`${endpoints.stayers}`);
  const [roomsStatus, setRoomsStatus] = useState<RoomStatus[]>([]);
  const [roomInformation] = useState<RoomInformation[]>([
    { roomID: 1, roomName: '学生部屋', top: 93, left: 91.7 },
    { roomID: 2, roomName: 'スマートルーム', top: 62.5, left: 35.5 },
    { roomID: 3, roomName: '院生室', top: 62.5, left: 59.7 },
    { roomID: 4, roomName: 'FA部屋', top: 62.5, left: 66.2 },
    { roomID: 5, roomName: '教員部屋', top: 93, left: 85.5 },
  ]);

  useEffect(() => {
    const tmpRoomsStatus: RoomStatus[] = [];
    const tmpRoomsInformation: RoomInformation[] = [];
    rooms.map((room) => {
      const tmpRoomStatus: RoomStatus = {
        roomID: room.roomId,
        userCount: 0,
        usersName: [],
      };
      const tmpRoomInformation: RoomInformation = {
        roomID: room.roomId,
        roomName: room.roomName,
        top: (room.polygon[0][1] + room.polygon[1][1]) / 36,
        left: (room.polygon[0][0] + room.polygon[1][0]) / 58,
      };
      tmpRoomsInformation.push(tmpRoomInformation);
      stayers.map((stayer) => {
        if (stayer.roomId === room.roomId) {
          tmpRoomStatus.userCount += 1;
          tmpRoomStatus.usersName.push(stayer.name);
        }
      });
      tmpRoomsStatus.push(tmpRoomStatus);
    });
    setRoomsStatus(tmpRoomsStatus);
    // APIから取得する場合はこっちで。ただこのままだと数回に一回レンダリングで不具合が出る。
    // setRoomInformation(tmpRoomsInformation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { roomsStatus, roomInformation };
};
