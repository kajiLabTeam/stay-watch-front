import { Avatar } from '@mantine/core';
import { Menu } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Confirmation } from '@/components/common/Confirmation';
//import { useUserState } from '@/globalStates/firebaseUserState';
import { useUserRoleState } from '@/globalStates/userRoleState';
import { pagesPath } from '@/utils/$path';
import { logout } from '@/utils/Auth';
import { auth } from '@/utils/firebase';

export const Profile = () => {
  //const user = useUserState();
  const userRole = useUserRoleState();
  const [showModal, setShowModal] = useState(false);
  const [user] = useAuthState(auth);

  const remove = () => {
    setShowModal(false);
  };

  return (
    <>
      <Menu position='bottom-end'>
        <Menu.Target>
          <button>
            <Avatar src={user?.photoURL} radius='xl' />
          </button>
        </Menu.Target>
        <Menu.Dropdown className='text-sm'>
          <Menu.Label>{user?.displayName}</Menu.Label>
          {/* 偶数の場合はその研究室の管理者 */}
          {userRole != null && userRole % 2 === 0 && (
            <Menu.Item component={NextLink} href={pagesPath.admin.$url()}>
              管理者ページ
            </Menu.Item>
          )}
          <Menu.Item>出欠登録</Menu.Item>
          <Menu.Item
            onClick={() => {
              logout();
            }}
          >
            ログアウト
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      {showModal && <Confirmation remove={remove} />}
    </>
  );
};
