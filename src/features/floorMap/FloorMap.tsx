import Image from 'next/image';
import { useState, useEffect } from 'react';
import { SizeMe } from 'react-sizeme';
import PopoverTop from '@/features/floorMap/PopoverTop';
// import { useRoomState } from '@/features/floorMap/roomState';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { useSuspenseSWR } from '@/hooks/useSuspenseSWR';
import { EditorRoom } from '@/types/roomFloormap';
import RoomInformation from '@/types/roomInformation';
import RoomStatus from '@/types/roomStatus';
import StayerType from '@/types/stayer';
import { endpoints } from '@/utils/api';

export const FloorMap = () => {
  const community = useCommunityState();
  const { data: rooms } = useSuspenseSWR<EditorRoom[]>(
    `${endpoints.getRoomsEditorByCommunityID}/${community.communityId}`,
  );
  const { data: stayers } = useSuspenseSWR<StayerType[]>(`${endpoints.stayers}`);
  const [roomsStatus, setRoomsStatus] = useState<RoomStatus[]>([]);
  const [roomInformation, setRoomInformation] = useState<RoomInformation[]>([
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
          top: (room.polygon[0][1] + room.polygon[1][1]) / 36,
          left: (room.polygon[0][0] + room.polygon[1][0]) / 58,
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
      setRoomInformation(tmpRoomsInformation);
    }
  }, [rooms, stayers]);

  return (
    <SizeMe monitorHeight monitorWidth>
      {({ size }) => {
        if (size.height != null && size.width != null) {
          return (
            <div className='relative mt-14'>
              <Image
                src={'/floor_maps/4g-honkan-bekkan.jpg'}
                alt='kajlab-room'
                width='1600vmin'
                height='900vmin'
              />
              {roomsStatus.map((roomStatus) => {
                if (size.height != null && size.width != null) {
                  return (
                    <div
                      key={roomStatus.roomID}
                      className='absolute  text-red-400'
                      style={{
                        left:
                          (size.width / 100) *
                          (roomInformation[roomStatus.roomID - 1] != null
                            ? roomInformation[roomStatus.roomID - 1].left
                            : 0),
                        top:
                          ((size.height - 10) / 100) *
                          (roomInformation[roomStatus.roomID - 1] != null
                            ? roomInformation[roomStatus.roomID - 1].top
                            : 0),
                        fontSize: size.width / 65,
                      }}
                    >
                      <PopoverTop
                        key={roomStatus.roomID}
                        roomID={roomStatus.roomID}
                        userCount={roomStatus.userCount}
                        usersName={roomStatus.usersName}
                        roomName={
                          roomInformation[roomStatus.roomID - 1] != null
                            ? roomInformation[roomStatus.roomID - 1].roomName
                            : ''
                        }
                      />
                    </div>
                  );
                }
              })}
            </div>
          );
        }

        return <div>loading</div>;
      }}
    </SizeMe>
  );
};
