import { useState } from 'react';
import { useParamChange } from './hooks/useParamChange';
import { NextButton } from './components/NextButton';
import { PrevButton } from './components/PrevButton';
import { StayLogTable } from './components/StayLogTable';
import UserSelecter from './components/UserSelecter';
import Error from '@/components/common/Error';
import Loading from '@/components/common/Loading';
import { StayLogGraph } from './components/StayLogGraph';
import { useCommunityState } from '@/atoms/communityAtom';
import { useGetAPI } from '@/hooks/useGetAPI';
import { LogsListResponse } from '@/types/log';
import { UserAttribute } from '@/types/user';
import { endpoints } from '@/utils/endpoint';

const RoomHistory = () => {
  const [currentOffset, currentPage, currentUserID, previousPage, nextPage, updateSelectedUser] =
    useParamChange();
  const [isGantt, setIsGantt] = useState(false);
  const community = useCommunityState();

  const {
    data: roomHistoryLog,
    error: stayLogError,
    isLoading: isLoadingStayLog,
  } = useGetAPI<LogsListResponse>(
    `${endpoints.logs}?offset=${currentOffset}${currentUserID ? `&&user-id=${currentUserID}` : ''}`,
  );

  const {
    data: users,
    error: usersError,
    isLoading: isLoadingUsers,
  } = useGetAPI<UserAttribute[]>(`${endpoints.users}/${community.communityId}`);

  if (isLoadingStayLog || isLoadingUsers) return <Loading message='滞在履歴取得中' />;
  if (stayLogError || usersError) return <Error message='滞在履歴取得失敗' />;
  if (users && roomHistoryLog && roomHistoryLog.logs)
    return (
      <>
        <title>滞在者履歴</title>
        <div className='mt-6 flex justify-between text-2xl md:text-3xl'>
          <div className='mt-6 flex justify-between'>
            <button
              onClick={() => {
                setIsGantt(!isGantt);
              }}
            >
              {isGantt ? (
                <img src='/ganttAnother.png' alt='stayer' width={27} height={27} />
              ) : (
                <>
                  <img src='/gantt.png' alt='stayer' width={27} height={27} />
                </>
              )}
            </button>
            <UserSelecter
              users={users}
              handleUserID={updateSelectedUser}
              paramsUserID={currentUserID}
            />
          </div>
        </div>
        {isGantt ? (
          <>
            <div className='my-4 border' />
            <StayLogGraph />
          </>
        ) : (
          <>
            <StayLogTable stayLogs={roomHistoryLog.logs} />
          </>
        )}
        <div className='hidden min-[854px]:block'>
          <div className='fixed inset-y-1/2 left-4'>
            <PrevButton currentPage={currentOffset} previousPage={previousPage} />
          </div>
          <div className='fixed inset-y-1/2 right-4'>
            <NextButton
              currentPage={currentPage}
              nextPage={nextPage}
              historyCount={roomHistoryLog.count}
            />
          </div>
        </div>
        <div className='mt-2 flex h-10 w-full justify-between text-white min-[854px]:hidden md:mt-4'>
          <PrevButton currentPage={currentOffset} previousPage={previousPage} />
          <NextButton
            currentPage={currentPage}
            nextPage={nextPage}
            historyCount={roomHistoryLog.count}
          />
        </div>
      </>
    );
  return <></>;
};

export default RoomHistory;
