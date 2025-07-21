'use client';
import React from 'react';
import { roleSelector } from '../constants/roleSelector';
import { UI_DATA } from '../constants/uidata';
import { EditUserForm } from '@/features/admin/editUser/components/EditUserForm';
import {
  useEditingUserMutators,
  useEditingUserState,
} from '@/features/admin/editUser/globalState/editingUserState';
import { UserEditor } from '@/types/user';

export const RegisterdUser = (props: { user: UserEditor }) => {
  const { setEditingUserId } = useEditingUserMutators();
  const { editingUserId } = useEditingUserState();
  const { user } = props;

  return (
    <>
      {user.id === editingUserId && (
        // フォーム表示
        <tr className='bg-gray-50 md:text-xl'>
          <td colSpan={5}>
            <EditUserForm user={user} />
          </td>
        </tr>
      )}
      {user.id !== editingUserId && (
        <tr className='text-left' key={user.id}>
          <td className='min-w-fit whitespace-nowrap border px-4 py-1'>
            <button onClick={() => setEditingUserId(user.id)} className='underline'>
              {user.name}
            </button>
          </td>
          {user.beaconName === UI_DATA.BEACON_NAME_STAYWATCHBEACON ? (
            <td className='min-w-fit whitespace-nowrap border px-4 py-1'>******</td>
          ) : (
            <td className='min-w-fit whitespace-nowrap border px-4 py-1'>{user.uuid}</td>
          )}
          <td className='min-w-fit whitespace-nowrap border px-4 py-1'>
            {roleSelector[user.role - 1].label}
          </td>
          <td className='min-w-fit whitespace-nowrap border px-4 py-1'>{user.beaconName}</td>
          <td className='whitespace-nowrap border px-4 py-1'>
            {user.tags.length > 0 ? user.tags[0].name : ''}
          </td>
        </tr>
      )}
    </>
  );
};
