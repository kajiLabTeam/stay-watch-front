import { Tabs } from '@mantine/core';
import EditFloorMap from '@/pages/Admin/components/EditFloorMap';
import UserEditor from '@/pages/Admin/components/EditUser';

interface AdminTabsProps {
  activeTab: string | null;
  onTabChanged: (tab: string | null) => void;
}

export function AdminTabs({ activeTab, onTabChanged }: AdminTabsProps) {
  return (
    <Tabs
      value={activeTab}
      onChange={onTabChanged}
      orientation={'vertical'}
      variant={'outline'}
      color={'blue'}
      classNames={{
        tab: 'h-24',
        root: 'mt-2',
      }}
    >
      <Tabs.List>
        <Tabs.Tab value='first' className='border-4 text-lg'>
          ユーザ一覧・管理
        </Tabs.Tab>
        <Tabs.Tab value='second' className='border-4 text-lg'>
          マップの編集
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value='first' className='border-l-4'>
        <UserEditor />
      </Tabs.Panel>
      <Tabs.Panel value='second' className='border-l-4'>
        <EditFloorMap />
      </Tabs.Panel>
    </Tabs>
  );
}
