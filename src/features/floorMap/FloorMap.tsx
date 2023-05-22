import Image from 'next/image';
import { useState } from 'react';
import { SizeMe } from 'react-sizeme';
import PopoverTop from '@/features/floorMap/PopoverTop';
import { useRoomState } from '@/features/floorMap/roomState';
import RoomInformation from '@/types/roomInformation';

export const FloorMap = () => {
  const { roomsStatus } = useRoomState();
  const [roomInformation] = useState<RoomInformation[]>([
    { roomID: 1, roomName: '学生部屋', top: 93, left: 91.7 },
    { roomID: 2, roomName: 'スマートルーム', top: 62.5, left: 35.5 },
    { roomID: 3, roomName: '院生室', top: 62.5, left: 59.7 },
    { roomID: 4, roomName: 'FA部屋', top: 62.5, left: 66.2 },
    { roomID: 5, roomName: '教員部屋', top: 93, left: 85.5 },
  ]);

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
