import { Tab } from '@headlessui/react';
import { useWindowSize } from 'react-use';
import GanttChart from './GanttChart';
import { Room } from '@/types/ganttStayLog';

// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  rooms: Room[];
};

const TabRoom = (props: Props) => {
  const { height, width: windowWidth } = useWindowSize();

  return (
    <div className='pt-8 sm:px-0'>
      <Tab.Group>
        <Tab.List className='flex space-x-1 rounded-xl bg-blue-900/20 p-1'>
          {props.rooms.map((room) => {
            return (
              <Tab
                key={room.id}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                  )
                }
              >
                {room.name}
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels>
          {props.rooms.map((room) => (
            <Tab.Panel key={room.id}>
              <div className={`w-[${windowWidth}px]`}>
                <GanttChart stayTimes={room.stayTimes} height={height} width={windowWidth / 1.2} />
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TabRoom;
