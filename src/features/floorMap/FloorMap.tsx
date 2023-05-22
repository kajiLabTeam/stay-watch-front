import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SizeMe } from 'react-sizeme';
import PopoverTop from '@/features/floorMap/PopoverTop';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { useSuspenseSWR } from '@/hooks/useSuspenseSWR';
import { EditorRoom } from '@/types/roomFloormap';
import RoomInformation from '@/types/roomInformation';
import RoomStatus from '@/types/roomStatus';
import StayerType from '@/types/stayer';
import { endpoints } from '@/utils/api';

export const FloorMap = () => {
  const community = useCommunityState();
  const [roomsStatus, setRoomsStatus] = useState<RoomStatus[]>([]);
  const [roomInformation, setRoomInformation] = useState<RoomInformation[]>([
    { roomID: 1, roomName: '', top: 0, left: 0 },
  ]);
  const { data: stayers } = useSuspenseSWR<StayerType[]>(`${endpoints.stayers}`);
  const { data: rooms } = useSuspenseSWR<EditorRoom[]>(
    `${endpoints.getRoomsEditorByCommunityID}/${community.communityId}`,
  );

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
    setRoomInformation(tmpRoomsInformation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                      {console.log(roomInformation[roomStatus.roomID - 1])}
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
