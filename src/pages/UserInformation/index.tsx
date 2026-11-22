import UserList from './components/UserList';
import { useCommunityState } from '@/atoms/communityAtom';
import Error from '@/components/common/Error';
import Loading from '@/components/common/Loading';
import { useGetAPI } from '@/hooks/useGetAPI';
import { UserAttribute } from '@/types/user';
import { ENDPOINTS } from '@/utils/endpoint';

export default function UserInformation() {
  const community = useCommunityState();
  const {
    data: users,
    error,
    isLoading,
  } = useGetAPI<UserAttribute[]>(`${ENDPOINTS.users}/${community.communityId}`);

  if (isLoading) return <Loading message='利用者情報取得中' />;
  if (error) return <Error message='利用者情報取得失敗' />;
  if (!users) return <></>;

  return (
    <>
      <title>利用者一覧</title>
      <UserList users={users} />
    </>
  );
}
