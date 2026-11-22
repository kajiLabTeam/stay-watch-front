import { StayLogGanttView } from './StayLogGanttView';
import { StayLogTable } from './StayLogTable';
import { Log } from '@/types/log';

interface RoomHistoryBodyProps {
  isGantt: boolean;
  stayLogs: Log[];
}

export function RoomHistoryBody({ isGantt, stayLogs }: RoomHistoryBodyProps) {
  return isGantt ? <StayLogGanttView /> : <StayLogTable stayLogs={stayLogs} />;
}
