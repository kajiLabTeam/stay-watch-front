import React from 'react';
import { RegisterdRoom } from '@/features/admin/editFloorMap/RegisterdRoom';
import { useEditingMapState } from '@/features/admin/editFloorMap/hooks/editingMapState';
import { Building, DBRoom } from '@/types/roomFloormap';

export const RegisterdRooms = (props: { rooms: DBRoom[]; buildings: Building[] }) => {
  const { currentSelectedBuildingIndex } = useEditingMapState();
  if (!props.rooms) return <div>loading...</div>;

  return (
    <div>
      <p>{props.rooms[0].community_name}</p>
      {props.rooms.map((room: DBRoom) => {
        return (
          <div key={room.roomID}>
            <RegisterdRoom room={room} building={props.buildings[currentSelectedBuildingIndex]} />
          </div>
        );
      })}
    </div>
  );
};
