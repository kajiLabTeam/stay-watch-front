import React from 'react';
import { EditUserForm } from '@/features/admin/user/EditUserForm';
import { useRoles } from '@/features/admin/user/hooks/editingUserState';
import { UserEditor } from '@/types/user';

export const RegisterdUser = (props: {
  user: UserEditor;
  editingUserId: number;
  setEditingUserId: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const roles = useRoles();

  return (
    <>
      {props.user.id === props.editingUserId && (
        <tr className='bg-gray-50 md:text-xl' onClick={() => props.setEditingUserId(props.user.id)}>
          <td colSpan={5}>
            <EditUserForm user={props.user} />
          </td>
        </tr>
      )}
      {props.user.id !== props.editingUserId && (
        <tr className='text-left' key={props.user.id}>
          <button onClick={() => props.setEditingUserId(props.user.id)} className='underline'>
            {props.user.name}
          </button>
          {/* <td className='min-w-fit whitespace-nowrap border py-1 px-4'>{props.user.name}</td> */}
          <td className='min-w-fit whitespace-nowrap border py-1 px-4'>{props.user.uuid}</td>
          <td className='min-w-fit whitespace-nowrap border py-1 px-4'>
            {roles[props.user.role - 1].label}
          </td>
          <td className='min-w-fit whitespace-nowrap border py-1 px-4'>{props.user.beaconName}</td>
          <td className='whitespace-nowrap border py-1 px-4'>{props.user.tags[0].name}</td>
        </tr>
      )}
    </>
  );

  // if (props.user.id === editingUserId) {
  //   return (
  //     <tr className='text-left' key={props.user.id}>
  //       <td colSpan={5}>
  //         <EditUserForm user={props.user} />
  //       </td>
  //     </tr>
  //   );
  // } else if (props.user.id !== editingUserId) {
  //   return (
  //     <tr className='text-left' key={props.user.id} onClick={() => setEditingUserId(props.user.id)}>
  //       <td className='min-w-fit whitespace-nowrap border py-1 px-4'>{props.user.name}</td>
  //       <td className='min-w-fit whitespace-nowrap border py-1 px-4'>{props.user.uuid}</td>
  //       <td className='min-w-fit whitespace-nowrap border py-1 px-4'>
  //         {roles[props.user.role - 1].label}
  //       </td>
  //       <td className='min-w-fit whitespace-nowrap border py-1 px-4'>{props.user.beaconName}</td>
  //       <td className='whitespace-nowrap border py-1 px-4'>{props.user.tags[0].name}</td>
  //     </tr>
  //   );
  // }
  // return <div>a</div>;
};
