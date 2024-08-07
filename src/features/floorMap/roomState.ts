import { useState, useEffect } from 'react';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { useSuspenseSWR } from '@/hooks/useSuspenseSWR';
import { EditorRoom, ViewerRoom } from '@/types/roomFloormap';
import StayerType from '@/types/stayer';
import { endpoints } from '@/utils/endpoint';

export const useRoomState = () => {
  const community = useCommunityState();
  const { data: rooms } = useSuspenseSWR<EditorRoom[]>(
    `${endpoints.getRoomsEditorByCommunityID}/${community.communityId}`,
  );
  const { data: stayers } = useSuspenseSWR<StayerType[]>(`${endpoints.stayers}`);
  const [viewerRooms, setViewerRooms] = useState<ViewerRoom[] | null>(null);

  useEffect(() => {
    if (rooms && stayers) {
      const tmpViewerRooms: ViewerRoom[] = [];
      rooms.forEach((room) => {
        const tmpViewerRoom: ViewerRoom = {
          roomId: room.roomId,
          roomName: room.roomName,
          userNames: [],
          userCount: 0,
          left: (room.polygon[0][0] + room.polygon[1][0]) / 2,
          top: (room.polygon[0][1] + room.polygon[1][1]) / 2,
        };
        stayers.forEach((stayer) => {
          if (stayer.roomId === room.roomId) {
            tmpViewerRoom.userCount += 1;
            tmpViewerRoom.userNames.push(stayer.name);
          }
        });
        tmpViewerRooms.push(tmpViewerRoom);
      });
      setViewerRooms(tmpViewerRooms);
    }
  }, [rooms, stayers]);

  return { viewerRooms };
};
