import { useMemo } from 'react';
import { useCommunityState } from '@/atoms/communityAtom';
import { useGetAPI } from '@/hooks/useGetAPI';
import { EditorRoom, ViewerRoom } from '@/types/roomFloormap';
import StayerType from '@/types/stayer';
import { ENDPOINTS } from '@/utils/endpoint';

export const useRoomState = () => {
  const community = useCommunityState();
  const { data: rooms } = useGetAPI<EditorRoom[]>(
    community ? `${ENDPOINTS.getRoomsEditorByCommunityID}/${community.communityId}` : null,
  );
  const { data: stayers } = useGetAPI<StayerType[]>(ENDPOINTS.stayers);

  const viewerRooms = useMemo((): ViewerRoom[] | null => {
    if (!rooms || !stayers) return null;
    return rooms.map((room) => {
      const roomStayers = stayers.filter((stayer) => stayer.roomId === room.roomId);
      return {
        roomId: room.roomId,
        roomName: room.roomName,
        userNames: roomStayers.map((stayer) => stayer.name),
        userCount: roomStayers.length,
        left: (room.polygon[0][0] + room.polygon[1][0]) / 2,
        top: (room.polygon[0][1] + room.polygon[1][1]) / 2,
      };
    });
  }, [rooms, stayers]);

  return { viewerRooms };
};
