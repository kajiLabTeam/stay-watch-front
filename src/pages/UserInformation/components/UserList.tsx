import { UserListItem } from './UserListItem';
import { UserAttribute } from '@/types/user';

interface UserListProps {
  users: readonly UserAttribute[];
}

export function UserList({ users }: UserListProps) {
  return (
    <div className='mt-5 w-full border text-base md:text-xl'>
      {users.map((user) => (
        <UserListItem key={user.id} user={user} />
      ))}
    </div>
  );
}
