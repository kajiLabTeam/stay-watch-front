import useSWR from 'swr';
import { UserAttribute } from '@/types/user';
import { endpoints } from '@/utils/api';

const UserInformation = () => {
  const { data: users, error } = useSWR<UserAttribute[]>(`${endpoints.users}`);

  if (error) return <div>failed to load</div>;
  if (!users) return <div>loading...</div>;

  return (
    <div>
      <div className='mt-6 text-2xl md:text-3xl'>利用者一覧</div>
      <div className='my-4 border' />
      <table className='w-full table-fixed text-xl sm:text-base md:text-2xl'>
        <thead>
          <tr className='bg-gray-700 text-left text-white'>
            <th className='w-1/2 border py-2 px-4'>Nae</th>
            <th className='border py-2 px-4'>Attribute</th>
          </tr>
        </thead>
        <tbody className='text-lg md:text-2xl'>
          {users.map((user) => (
            <tr className='text-left' key={user.id}>
              <td className='border py-2 px-4'>{user.name}</td>
              <td className='flex flex-col  border py-2 px-4 md:flex-row md:gap-4'>
                {user.tags.map((tag) => (
                  <div className='' key={tag.id}>
                    {tag.name}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default UserInformation;
