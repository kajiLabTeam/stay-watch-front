import React from 'react';
import RegisterdUser from './RegisterdUser';
import Loading from '@/components/common/Loading';
import { BeaconType } from '@/pages/Admin/types/beacon';
import { UserEditor } from '@/types/user';

export default function RegisterdUsers(props: { users: UserEditor[]; beaconTypes: BeaconType[] }) {
  const { users, beaconTypes } = props;

  if (!users || !beaconTypes) return <Loading message='ユーザ情報取得中' />;

  return (
    <table className='w-full min-w-[1000px] md:text-xl'>
      <thead>
        <tr className='bg-gray-700 text-left text-white md:text-xl'>
          <th className='border px-4 py-1'>名前</th>
          <th className='border px-4 py-1'>権限</th>
          <th className='whitespace-nowrap border px-4 py-1'>ビーコン形態</th>
          <th className='whitespace-nowrap border px-4 py-1'>PrivBeaconキー</th>
        </tr>
      </thead>
      <tbody className='text-lg md:text-xl'>
        {users.map((user) => (
          <RegisterdUser user={user} beaconTypes={beaconTypes} key={user.id} />
        ))}
      </tbody>
    </table>
  );
}
