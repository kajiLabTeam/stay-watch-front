import React from 'react';
import { useState } from 'react';
import { RegisterdUser } from './RegisterdUser';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { useSuspenseSWR } from '@/hooks/useSuspenseSWR';
import { UserEditor } from '@/types/user';
import { endpoints } from '@/utils/api';

export const RegisterdUsers = () => {
  const [editingUserId, setEditingUserId] = useState(-1);
  const community = useCommunityState();
  const { data: users } = useSuspenseSWR<UserEditor[]>(
    `${endpoints.adminUsers}/${community.communityId}`,
  );

  return (
    <div>
      <table className='w-full min-w-[1000px] md:text-xl'>
        <thead>
          <tr className='bg-gray-700 text-left text-white md:text-xl'>
            <th className='border py-1 px-4'>名前</th>
            <th className='border py-1 px-4'>UUID</th>
            <th className='border py-1 px-4'>権限</th>
            <th className='whitespace-nowrap border py-1 px-4'>ビーコン形態</th>
            <th className='whitespace-nowrap border py-1 px-4'>タグ1</th>
          </tr>
        </thead>
        <tbody className='text-lg md:text-xl'>
          {users.map((user: UserEditor) => (
            <RegisterdUser
              user={user}
              editingUserId={editingUserId}
              setEditingUserId={setEditingUserId}
              key={user.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
