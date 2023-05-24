import Image from 'next/image';
import { useState } from 'react';
import { SizeMe } from 'react-sizeme';
import PopoverTop from '@/features/floorMap/PopoverTop';
import { useRoomState } from '@/features/floorMap/roomState';

export const FloorMap = () => {
  const { roomsStatus, roomInformation } = useRoomState();
  const [componentHeight, setComponentHeight] = useState(0);
  const [componentWidth, setComponentWidth] = useState(0);

  return (
    <SizeMe monitorHeight monitorWidth>
      {({ size }) => {
        if (size.height != null && size.width != null) {
          setComponentHeight(size.height);
          setComponentWidth(size.width);
          return (
            <div className='relative mt-14'>
              <Image
                src={'/floor_maps/4g-honkan-bekkan.jpg'}
                alt='kajlab-room'
                width='1600vmin'
                height='900vmin'
              />
              {roomsStatus.map((roomStatus) => {
                return (
                  <div
                    key={roomStatus.roomID}
                    className='absolute  text-red-400'
                    style={{
                      left:
                        (componentWidth / 100) *
                        (roomInformation[roomStatus.roomID - 1] != null
                          ? roomInformation[roomStatus.roomID - 1].left
                          : 0),
                      top:
                        ((componentHeight - 10) / 100) *
                        (roomInformation[roomStatus.roomID - 1] != null
                          ? roomInformation[roomStatus.roomID - 1].top
                          : 0),
                      fontSize: componentWidth / 65,
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
              })}
            </div>
          );
        }

        return <div>loading</div>;
      }}
    </SizeMe>
  );
};
