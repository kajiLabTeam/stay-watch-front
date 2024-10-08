'use client';
import React from 'react';
import { RegisterdUser } from './RegisterdUser';
import Error from '@/components/common/Error';
import Loading from '@/components/common/Loading';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { useGetAPI } from '@/hooks/useGetAPI';
import { UserEditor } from '@/types/user';
import { endpoints } from '@/utils/endpoint';

export const RegisterdUsers = () => {
  const community = useCommunityState();
  const { data: users, error } = useGetAPI<UserEditor[]>(
    `${endpoints.adminUsers}/${community.communityId}`,
  );

  if (error) return <Error message='ユーザ情報取得失敗' />;
  if (users)
    return (
      <div>
        <table className='w-full min-w-[1000px] md:text-xl'>
          <thead>
            <tr className='bg-gray-700 text-left text-white md:text-xl'>
              <th className='border px-4 py-1'>名前</th>
              <th className='border px-4 py-1'>UUID</th>
              <th className='border px-4 py-1'>権限</th>
              <th className='whitespace-nowrap border px-4 py-1'>ビーコン形態</th>
              <th className='whitespace-nowrap border px-4 py-1'>タグ1</th>
            </tr>
          </thead>
          <tbody className='text-lg md:text-xl'>
            {users.map((user: UserEditor) => (
              <RegisterdUser user={user} key={user.id} />
            ))}
          </tbody>
        </table>
      </div>
    );
  return <Loading message='ユーザ情報取得中' />;
};
