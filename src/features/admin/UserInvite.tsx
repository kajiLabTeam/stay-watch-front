import { Tabs } from '@mantine/core';
import { FC } from 'react';
import { BLERegisteredForm } from '@/features/admin/BLERegisteredForm';
import { BLEUnRegisteredForm } from '@/features/admin/BLEUnRegisteredForm';
import { useUserRoleState } from '@/globalStates/userRoleState';

const UserInvite: FC = () => {
  const userRole = useUserRoleState();

  if (userRole == null || userRole % 2 !== 0) {
    return <div>管理者権限がありません</div>;
  }

  return (
    <div className=' ml-24 flex h-screen'>
      <div className='w-8/12 '>
        <div className='my-2 text-center text-3xl font-bold'>メンバーの招待</div>
        <div className=' border border-black' />
        <div className='mt-10 rounded-lg bg-slate-200'>
          <Tabs defaultValue='outline'>
            <Tabs.List>
              <Tabs.Tab value='gallery' className='w-6/12'>
                BLEビーコン登録済み
              </Tabs.Tab>
              <Tabs.Tab value='messages' className='w-6/12'>
                BLEビーコン未登録
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value='gallery' pt='xs'>
              <BLERegisteredForm />
            </Tabs.Panel>
            <Tabs.Panel value='messages' pt='xs'>
              <BLEUnRegisteredForm />
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserInvite;
