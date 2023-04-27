import React from 'react';
import { useState } from 'react';
import { EditUserForm } from '@/features/admin/user/EditUserForm';
import { useRoles } from '@/features/admin/user/hooks/editingUserState';
import { UserEditor } from '@/types/user';

export const RegisterdUser = (props: { user: UserEditor }) => {
  const roles = useRoles();
  // const [editingUserId, setEditingUserId] = useState(-1);
  const [editingUserId, setEditingUserId] = useState(6);

  if (props.user.id === editingUserId) {
    return (
      <tr className='text-left' key={props.user.id}>
        <td colSpan={5}>
          <EditUserForm user={props.user} />
        </td>
      </tr>
    );
  } else if (props.user.id !== editingUserId) {
    return (
      <tr className='text-left' key={props.user.id} onClick={() => setEditingUserId(props.user.id)}>
        <td className='min-w-fit whitespace-nowrap border py-1 px-4'>{props.user.name}</td>
        <td className='min-w-fit whitespace-nowrap border py-1 px-4'>{props.user.uuid}</td>
        <td className='min-w-fit whitespace-nowrap border py-1 px-4'>
          {roles[props.user.role - 1].label}
        </td>
        <td className='min-w-fit whitespace-nowrap border py-1 px-4'>{props.user.beaconName}</td>
        <td className='whitespace-nowrap border py-1 px-4'>{props.user.tags[0].name}</td>
      </tr>
    );
  }
  return <div>a</div>;
};
