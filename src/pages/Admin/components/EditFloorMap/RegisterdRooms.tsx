import React from 'react';
import RegisterdRoom from './RegisterdRoom';
import { useEditingMapState } from '@/atoms/editingMapAtom';
import { useCommunityState } from '@/atoms/communityAtom';
import { Building, EditorRoom } from '@/types/roomFloormap';

export default function RegisterdRooms(props: { rooms: EditorRoom[]; buildings: Building[] }) {
  const { currentSelectedBuildingIndex } = useEditingMapState();
  const community = useCommunityState();

  return (
    <div>
      <p>{community?.communityName}</p>
      {props.rooms.map((room: EditorRoom) => (
        <RegisterdRoom
          key={room.roomId}
          room={room}
          building={props.buildings[currentSelectedBuildingIndex]}
        />
      ))}
    </div>
  );
}
