import React from 'react';
import { useRoles } from '@/features/admin/user/hooks/editingUserState';
import { UserEditor } from '@/types/user';

export const RegisterdUser = (props: { user: UserEditor }) => {
  const roles = useRoles();

  return (
    <tr className='text-left' key={props.user.id}>
      <td className='border py-1 px-4'>{props.user.name}</td>
      <td className='border py-1 px-4'>{props.user.uuid}</td>
      <td className='border py-1 px-4'>{roles[props.user.role - 1].label}</td>
      <td className='border py-1 px-4'>{props.user.beaconName}</td>
      <td className='border py-1 px-4'>{props.user.tags[0].name}</td>
    </tr>
  );
};
