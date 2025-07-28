import { useDocumentTitle } from '@mantine/hooks';
import Image from 'next/image';
import { useState } from 'react';
import { useWindowSize } from 'usehooks-ts';
import { useParamChange } from '../hooks/useParamChange';
import { NextButton } from './NextButton';
import { PrevButton } from './PrevButton';
import { StayLogTable } from './StayLogTable';
import UserSelecter from './UserSelecter';
import Error from '@/components/common/Error';
import Loading from '@/components/common/Loading';
import { StayLogGraph } from '@/features/stayLogGraph/components/StayLogGraph';
import { useGetAPI } from '@/hooks/useGetAPI';
import { LogsListResponse } from '@/types/log';
import { UserAttribute } from '@/types/user';
import { endpoints } from '@/utils/endpoint';

const RoomHistory = () => {
  useDocumentTitle('滞在者履歴');
  const { width } = useWindowSize();
  const [currentOffset, currentPage, currentUserID, previousPage, nextPage, updateSelectedUser] =
    useParamChange();
  const [isGantt, setIsGantt] = useState(false);

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
  } = useGetAPI<UserAttribute[]>(`${endpoints.users}`);

  if (isLoadingStayLog || isLoadingUsers) return <Loading message='滞在履歴取得中' />;
  if (stayLogError || usersError) return <Error message='滞在履歴取得失敗' />;
  if (users && roomHistoryLog && roomHistoryLog.logs)
    return (
      <>
        <div className='mt-6 flex justify-between text-2xl md:text-3xl'>
          <div className='mt-6 flex justify-between'>
            <button
              onClick={() => {
                setIsGantt(!isGantt);
              }}
            >
              {isGantt ? (
                <Image src='/ganttAnother.png' alt='stayer' width={27} height={27} />
              ) : (
                <>
                  <Image src='/gantt.png' alt='stayer' width={27} height={27} />
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
        {width > 853 ? (
          <div>
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
        ) : (
          <div className='mt-2 flex h-10 w-full justify-between text-white md:mt-4'>
            <PrevButton currentPage={currentOffset} previousPage={previousPage} />
            <NextButton
              currentPage={currentPage}
              nextPage={nextPage}
              historyCount={roomHistoryLog.count}
            />
          </div>
        )}
      </>
    );
  return <></>;
};

export default RoomHistory;
