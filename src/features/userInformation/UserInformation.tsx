import { useDocumentTitle } from '@mantine/hooks';
import Loading from '@/components/common/Loading';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { useSuspenseSWR } from '@/hooks/useSuspenseSWR';
import { UserAttribute } from '@/types/user';
import { endpoints } from '@/utils/endpoint';

const UserInformation = () => {
  useDocumentTitle('利用者一覧');
  const community = useCommunityState();
  const {
    data: users,
    error,
    isLoading,
  } = useSuspenseSWR<UserAttribute[]>(`${endpoints.users}/${community.communityId}`);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <Loading message='利用者情報取得中' />;

  if (users)
    return (
      <div>
        <table className='mt-5 w-full table-fixed text-xl sm:text-base md:text-2xl'>
          <thead>
            <tr className='bg-staywatch-black text-left text-white'>
              <th className='w-1/2 border px-4 py-2'>名前</th>
              <th className='border px-4 py-2'>タグ</th>
            </tr>
          </thead>
          <tbody className='text-lg md:text-2xl'>
            {users.map((user) => (
              <tr className='text-left' key={user.id}>
                <td className='border px-4 py-2'>{user.name}</td>
                <td className='flex flex-col  border px-4 py-2 md:flex-row md:gap-4'>
                  {user.tags.map((tag, index) => (
                    <div className='' key={tag.id}>
                      {tag.name}
                      {index !== user.tags.length - 1 && ' , '}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  return <></>;
};
export default UserInformation;
