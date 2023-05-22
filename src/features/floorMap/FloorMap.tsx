import Image from 'next/image';
import { useState } from 'react';
import { SizeMe } from 'react-sizeme';
import PopoverTop from '@/features/floorMap/PopoverTop';
// import { useRoomState } from '@/features/floorMap/roomState';
import RoomInformation from '@/types/roomInformation';
import RoomStatus from '@/types/roomStatus';

export const FloorMap = () => {
  //const { roomsStatus, roomInformation } = useRoomState();
  const [roomsStatus] = useState<RoomStatus[]>([
    {
      roomID: 1,
      userCount: 2,
      usersName: ['tarou', 'jirou'],
    },
    {
      roomID: 2,
      userCount: 1,
      usersName: ['tarou'],
    },
    {
      roomID: 3,
      userCount: 1,
      usersName: ['tarou'],
    },
    {
      roomID: 4,
      userCount: 1,
      usersName: ['tarou'],
    },
    {
      roomID: 5,
      userCount: 1,
      usersName: ['tarou'],
    },
  ]);

  const [roomInformation] = useState<RoomInformation[]>([
    {
      roomID: 1,
      roomName: '学生1',
      top: 93,
      left: 90,
    },
    {
      roomID: 2,
      roomName: '学生2',
      top: 83,
      left: 80,
    },
    {
      roomID: 3,
      roomName: '学生3',
      top: 73,
      left: 90,
    },
    {
      roomID: 4,
      roomName: '学生4',
      top: 43,
      left: 90,
    },
    {
      roomID: 5,
      roomName: '学生5',
      top: 33,
      left: 90,
    },
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
