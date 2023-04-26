import React from 'react';
import { RegisterdUser } from './RegisterdUser';
import { useSuspenseSWR } from '@/hooks/useSuspenseSWR';
import { UserEditor } from '@/types/user';
import { endpoints } from '@/utils/api';

export const RegisterdUsers = () => {
  // const { currentSelectedBuildingIndex } = useEditingMapState();
  const { data: users } = useSuspenseSWR<UserEditor[]>(`${endpoints.adminUsers}`);

  return (
    <div>
      <div className='my-4 border' />
      <table className='w-full md:text-xl'>
        <thead>
          <tr className='bg-gray-700 text-left text-white md:text-xl'>
            <th className='border py-1 px-4'>名前</th>
            <th className='border py-1 px-4'>UUID</th>
            <th className='border py-1 px-4'>権限</th>
            <th className='border py-1 px-4'>ビーコン形態</th>
            <th className='border py-1 px-4'>タグ1</th>
          </tr>
        </thead>
        <tbody className='text-lg md:text-xl'>
          {users.map((user: UserEditor) => (
            <RegisterdUser user={user} key={user.id} />
          ))}
        </tbody>
      </table>
    </div>
    // <div>

    //   {users.map((user: UserEditor) => {
    //     return (

    //       <div key={user.id}>
    //         <RegisterdUser user={user} />
    //       </div>
    //     );
    //   })}
    // </div>
  );

  // return (
  //   <div>

  //   </div>
  // );

  // return (
  //   <div>
  //     <p>{props.rooms[0].communityName}</p>
  //     {props.rooms.map((room: EditorRoom) => {
  //       return (
  //         <div key={room.roomId}>
  //           <RegisterdRoom room={room} building={props.buildings[currentSelectedBuildingIndex]} />
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
};
