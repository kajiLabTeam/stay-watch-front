'use client';
import React from 'react';
import { roleSelector } from '../constants/roleSelector';
import { Badge } from '@/components/common/Badge';
import { EditUserForm } from '@/features/admin/editUser/components/EditUserForm';
import {
  useEditingUserMutators,
  useEditingUserState,
} from '@/features/admin/editUser/globalState/editingUserState';
import { BeaconType } from '@/types/beacon';
import { UserEditor } from '@/types/user';

export const RegisterdUser = (props: { user: UserEditor; beaconTypes: BeaconType[] }) => {
  const { setEditingUserId } = useEditingUserMutators();
  const { editingUserId } = useEditingUserState();
  const { user, beaconTypes } = props;

  return (
    <>
      {user.id === editingUserId && (
        // フォーム表示
        <tr className='bg-gray-50 md:text-xl'>
          <td colSpan={5}>
            <EditUserForm user={user} beaconTypes={beaconTypes} />
          </td>
        </tr>
      )}
      {user.id !== editingUserId && (
        <tr className='text-left' key={user.id}>
          <td className='flex min-w-fit whitespace-nowrap border px-4 py-1'>
            <button onClick={() => setEditingUserId(user.id)} className='underline'>
              {user.name}
            </button>
            <div className='ml-2 flex items-center'>
              {user.tags.map((tag) => (
                <div key={`${user.id}${tag.name}div`} className='mr-1'>
                  <Badge key={`${user.id}${tag.name}badge`} name={tag.name} />
                </div>
              ))}
            </div>
          </td>
          <td className='min-w-fit whitespace-nowrap border px-4 py-1'>
            {roleSelector[user.role - 1].label}
          </td>
          <td className='min-w-fit whitespace-nowrap border px-4 py-1'>
            {user.beaconName === '' ? '未所持' : user.beaconName}
          </td>
          <td className='min-w-fit whitespace-nowrap border px-4 py-1'>
            {user.privBeaconKeySuffix === '' ? '' : `****${user.privBeaconKeySuffix}`}
          </td>
        </tr>
      )}
    </>
  );
};
