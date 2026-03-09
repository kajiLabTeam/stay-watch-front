import { useDocumentTitle } from '@mantine/hooks';
import { Badge } from '@/components/common/Badge';
import Error from '@/components/common/Error';
import Loading from '@/components/common/Loading';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { useGetAPI } from '@/hooks/useGetAPI';
import { UserAttribute } from '@/types/user';
import { endpoints } from '@/utils/endpoint';

const UserInformation = () => {
  useDocumentTitle('利用者一覧');
  const community = useCommunityState();
  const {
    data: users,
    error,
    isLoading,
  } = useGetAPI<UserAttribute[]>(`${endpoints.users}/${community.communityId}`);

  if (isLoading) return <Loading message='利用者情報取得中' />;
  if (error) return <Error message='利用者情報取得失敗' />;
  if (users)
    return (
      <div className='mt-5 w-full border text-base md:text-xl'>
        {users.map((user) => (
          <div className='flex w-full items-center border px-4 py-2 text-left' key={user.id}>
            {user.name}
            {user.tags.map((tag) => (
              <div className='ml-1' key={tag.id}>
                <Badge name={tag.name} />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  return <></>;
};
export default UserInformation;
