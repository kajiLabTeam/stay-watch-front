'use client';
import { Tabs } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { useState } from 'react';
import EditFloorMap from '@/features/admin/editFloorMap/components/EditFloorMap';
import UserEditor from '@/features/admin/editUser/components/EditUser';
import { useUserRoleState } from '@/globalStates/userRoleState';

export const Admin = () => {
  useDocumentTitle('管理者ページ');
  const [activeTab, setActiveTab] = useState<string | null>('first');
  const userRole = useUserRoleState();

  if (userRole === 1) {
    return <div>管理者権限がありません</div>;
  }

  return (
    <Tabs
      value={activeTab}
      onChange={setActiveTab}
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
        {/* <div>firstdayo</div> */}
      </Tabs.Panel>
      <Tabs.Panel value='second' className='border-l-4'>
        <EditFloorMap />
      </Tabs.Panel>
    </Tabs>
  );
};
