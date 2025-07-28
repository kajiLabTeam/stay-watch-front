import { Tab } from '@headlessui/react';
import Loading from '@/components/common/Loading';
import TabRoom from '@/features/stayLogGraph/components/TabRoom';
import { useGetAPI } from '@/hooks/useGetAPI';
import GanttStayLog from '@/types/ganttStayLog';
import { endpoints } from '@/utils/endpoint';

// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const StayLogGraph = () => {
  const { data, error } = useGetAPI<GanttStayLog[]>(`${endpoints.logsGantt}`);
  if (error) return <div>滞在グラフデータ取得失敗</div>;
  if (!data) return <Loading message='滞在情報取得中' />;
  return (
    <div className='pt-8 sm:px-0'>
      <Tab.Group>
        <Tab.List className='flex space-x-1 rounded-xl bg-blue-900/20 p-1'>
          {data.map((item) => {
            return (
              <Tab
                key={item.id}
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
                {item.date}
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels>
          {data.map((item) => (
            <Tab.Panel key={item.id}>
              <TabRoom rooms={item.rooms} key={item.id} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
