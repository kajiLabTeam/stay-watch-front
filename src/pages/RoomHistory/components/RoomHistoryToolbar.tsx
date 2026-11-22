import GanttToggleButton from './GanttToggleButton';
import UserSelecter from './UserSelecter';
import { UserAttribute } from '@/types/user';

interface RoomHistoryToolbarProps {
  isGantt: boolean;
  users: UserAttribute[];
  selectedUserId: string | null;
  onGanttToggled: () => void;
  onUserSelected: (userId: string | null) => void; // oxlint-disable-line
}

export default function RoomHistoryToolbar({
  isGantt,
  users,
  selectedUserId,
  onGanttToggled,
  onUserSelected,
}: RoomHistoryToolbarProps) {
  return (
    <div className='mt-6 flex justify-between text-2xl md:text-3xl'>
      <div className='mt-6 flex justify-between'>
        <GanttToggleButton isGantt={isGantt} onToggled={onGanttToggled} />
        <UserSelecter users={users} handleUserID={onUserSelected} paramsUserID={selectedUserId} />
      </div>
    </div>
  );
}
