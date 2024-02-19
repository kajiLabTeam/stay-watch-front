import { useDocumentTitle } from '@mantine/hooks';
import useSWR from 'swr';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { UserAttribute } from '@/types/user';
import { endpoints } from '@/utils/api';

const UserInformation = () => {
  useDocumentTitle('利用者一覧');
  const community = useCommunityState();
  const { data: users, error } = useSWR<UserAttribute[]>(
    `${endpoints.users}/${community.communityId}`,
  );

  if (error) return <div>failed to load</div>;
  if (!users) return <div>loading...</div>;

  return (
    <div>
      <table className='mt-5 w-full table-fixed text-xl sm:text-base md:text-2xl'>
        <thead>
          <tr className='bg-staywatch-black text-left text-white'>
            <th className='w-1/2 border py-2 px-4'>名前</th>
            <th className='border py-2 px-4'>タグ</th>
          </tr>
        </thead>
        <tbody className='text-lg md:text-2xl'>
          {users.map((user) => (
            <tr className='text-left' key={user.id}>
              <td className='border py-2 px-4'>{user.name}</td>
              <td className='flex flex-col  border py-2 px-4 md:flex-row md:gap-4'>
                {user.tags.map((tag, index) => (
                  <div className='' key={tag.id}>
                    {tag.name}
                    {index !== user.tags.length - 1 && " , "}
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
