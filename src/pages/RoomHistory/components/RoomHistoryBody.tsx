import StayLogGanttView from './StayLogGanttView';
import StayLogTable from './StayLogTable';
import { Log } from '@/pages/RoomHistory/types/log';

interface RoomHistoryBodyProps {
  isGantt: boolean;
  stayLogs: Log[];
}

export default function RoomHistoryBody({ isGantt, stayLogs }: RoomHistoryBodyProps) {
  return isGantt ? <StayLogGanttView /> : <StayLogTable stayLogs={stayLogs} />;
}
