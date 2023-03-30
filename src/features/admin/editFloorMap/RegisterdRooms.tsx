import React from 'react';
import { RegisterdRoom } from '@/features/admin/editFloorMap/RegisterdRoom';
import { useEditingMapState } from '@/features/admin/editFloorMap/hooks/editingMapState';
import { Building, DBRoom } from '@/types/roomFloormap';

export const RegisterdRooms = (props: { rooms: DBRoom[]; buildings: Building[] }) => {
  const { currentSelectedBuildingIndex } = useEditingMapState();

  return (
    <div>
      <p>{props.rooms[0].communityName}</p>
      {props.rooms.map((room: DBRoom) => {
        return (
          <div key={room.roomId}>
            <RegisterdRoom room={room} building={props.buildings[currentSelectedBuildingIndex]} />
          </div>
        );
      })}
    </div>
  );
};
