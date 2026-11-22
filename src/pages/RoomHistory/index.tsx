import { useState } from 'react';
import { useParamChange } from './hooks/useParamChange';
import { RoomHistoryBody } from './components/RoomHistoryBody';
import { RoomHistoryPagination } from './components/RoomHistoryPagination';
import { RoomHistoryToolbar } from './components/RoomHistoryToolbar';
import Error from '@/components/common/Error';
import Loading from '@/components/common/Loading';
import { useCommunityState } from '@/atoms/communityAtom';
import { useGetAPI } from '@/hooks/useGetAPI';
import { LogsListResponse } from '@/types/log';
import { UserAttribute } from '@/types/user';
import { ENDPOINTS } from '@/utils/endpoint';

function RoomHistory() {
  const [currentOffset, currentPage, currentUserID, previousPage, nextPage, updateSelectedUser] =
    useParamChange();
  const [isGantt, setIsGantt] = useState(false);
  const community = useCommunityState();

  const {
    data: roomHistoryLog,
    error: stayLogError,
    isLoading: isLoadingStayLog,
  } = useGetAPI<LogsListResponse>(
    `${ENDPOINTS.logs}?offset=${currentOffset}${currentUserID ? `&&user-id=${currentUserID}` : ''}`,
  );

  const {
    data: users,
    error: usersError,
    isLoading: isLoadingUsers,
  } = useGetAPI<UserAttribute[]>(`${ENDPOINTS.users}/${community.communityId}`);

  if (isLoadingStayLog || isLoadingUsers) return <Loading message='滞在履歴取得中' />;
  if (stayLogError || usersError) return <Error message='滞在履歴取得失敗' />;
  if (!users || !roomHistoryLog || !roomHistoryLog.logs) return <></>;

  return (
    <>
      <title>滞在者履歴</title>
      <RoomHistoryToolbar
        isGantt={isGantt}
        users={users}
        selectedUserId={currentUserID}
        onGanttToggled={() => setIsGantt(!isGantt)}
        onUserSelected={updateSelectedUser}
      />
      <RoomHistoryBody isGantt={isGantt} stayLogs={roomHistoryLog.logs} />
      <RoomHistoryPagination
        currentOffset={currentOffset}
        currentPage={currentPage}
        historyCount={roomHistoryLog.count}
        onPreviousPageClicked={previousPage}
        onNextPageClicked={nextPage}
      />
    </>
  );
}

export default RoomHistory;
