import Badge from '@/components/common/Badge';
import { UserAttribute } from '@/types/user';

interface UserListItemProps {
  user: UserAttribute;
}

export default function UserListItem({ user }: UserListItemProps) {
  return (
    <div className='flex w-full items-center border px-4 py-2 text-left'>
      {user.name}
      {user.tags.map((tag) => (
        <div className='ml-1' key={tag.id}>
          <Badge name={tag.name} />
        </div>
      ))}
    </div>
  );
}
