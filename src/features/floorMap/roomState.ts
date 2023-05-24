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
  const [roomsInformation, setRoomsInformation] = useState<RoomInformation[]>([
    { roomID: 1, roomName: '', top: 0, left: 0 },
  ]);

  useEffect(() => {
    if (rooms && stayers) {
      const tmpRoomsStatus: RoomStatus[] = [];
      const tmpRoomsInformation: RoomInformation[] = [];
      rooms.forEach((room) => {
        const tmpRoomStatus: RoomStatus = {
          roomID: room.roomId,
          userCount: 0,
          usersName: [],
        };
        const tmpRoomInformation: RoomInformation = {
          roomID: room.roomId,
          roomName: room.roomName,
          top: room.polygon[0][1] + room.polygon[1][1],
          left: room.polygon[0][0] + room.polygon[1][0],
        };
        tmpRoomsInformation.push(tmpRoomInformation);
        stayers.forEach((stayer) => {
          if (stayer.roomId === room.roomId) {
            tmpRoomStatus.userCount += 1;
            tmpRoomStatus.usersName.push(stayer.name);
          }
        });
        tmpRoomsStatus.push(tmpRoomStatus);
      });
      setRoomsStatus(tmpRoomsStatus);
      setRoomsInformation(tmpRoomsInformation);
    }
  }, [rooms, stayers]);

  return { roomsStatus, roomsInformation };
};
