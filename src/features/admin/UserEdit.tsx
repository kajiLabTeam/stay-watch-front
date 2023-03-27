import { CopyButton } from '@mantine/core';
import Image from 'next/image';
import { FC } from 'react';
import useSWR from 'swr';
import { Button } from '@/components/common/Button';
import { extendedUser } from '@/types/user';
import { endpoints } from '@/utils/api';

const UserEdit: FC = () => {
  const { data: users, error } = useSWR<extendedUser[]>(`${endpoints.extendedUsers}`);
  if (error) return <div>failed to load</div>;
  if (!users) return <div>loading...</div>;

  return (
    <div className='ml-8 mt-8'>
      <div className='mt-6 text-2xl md:text-3xl'>利用者一覧</div>
      <div className='my-4 border' />
      <table className='w-full  text-xl sm:text-base md:text-2xl'>
        <thead>
          <tr className='bg-gray-700 text-left text-white'>
            <th className=' border py-2 pl-4'>Name</th>
            {/* <th className="border py-2 pl-4">Attribute</th> */}
            <th className='border py-2 pl-4'>uuid</th>
            <th className='border py-2 pl-4'>role</th>
          </tr>
        </thead>

        <tbody className='text-lg md:text-2xl'>
          {users.map((user) => (
            <tr className='text-left' key={user.id}>
              <td className='border py-2 pl-4'>{user.name}</td>
              <td className='border py-2 pl-4'>
                {user.uuid}
                <CopyButton value={user.uuid} timeout={2000}>
                  {({ copied, copy }) => (
                    <span className=''>
                      {copied ? (
                        <Image src='/check.png' alt='stayer' width={20} height={20} />
                      ) : (
                        <button
                          onClick={() => {
                            copy();
                          }}
                        >
                          <Image src='/copy.png' alt='stayer' width={20} height={20} />
                        </button>
                      )}
                    </span>
                  )}
                </CopyButton>
              </td>
              <td className='border py-2 pl-4'>{user.role === 1 ? '利用者' : '管理者'}</td>
              <td className='pl-4'>
                <Button color='red'>削除</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserEdit;
