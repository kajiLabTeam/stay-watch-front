import React from 'react';
import { RegisterdRoom } from '@/features/admin/editFloorMap/RegisterdRoom';
import { useEditingMapState } from '@/features/admin/editFloorMap/hooks/editingMapState';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { Building, EditorRoom } from '@/types/roomFloormap';

export const RegisterdRooms = (props: { rooms: EditorRoom[]; buildings: Building[] }) => {
  const { currentSelectedBuildingIndex } = useEditingMapState();
  const community = useCommunityState();

  return (
    <div>
      <p>{community.communityName}</p>
      {props.rooms.map((room: EditorRoom) => {
        return (
          <div key={room.roomId}>
            <RegisterdRoom room={room} building={props.buildings[currentSelectedBuildingIndex]} />
          </div>
        );
      })}
    </div>
  );
};
