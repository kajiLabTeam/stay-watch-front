import { useDocumentTitle } from '@mantine/hooks';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useWindowSize } from 'usehooks-ts';
import RoomTabDate from './RoomTabDate';
import { useCurrentPage } from './roomHistoryhook';
import Error from '@/components/common/Error';
import Loading from '@/components/common/Loading';
import * as RoomHistoryComponents from '@/features/roomHistory/components/Index';
import { useGetAPI } from '@/hooks/useGetAPI';
import Log from '@/types/log';
import { endpoints } from '@/utils/endpoint';

const RoomHistory = () => {
  useDocumentTitle('滞在者履歴');
  const { width } = useWindowSize();
  const searchParams = useSearchParams();
  const HistoryCount = 60;

  const [CurrentOffset, CurrentPage, PreviousPage, NextPage] = useCurrentPage();

  const selectedUserID = searchParams.get('user-id') || undefined;

  const {
    data: logs,
    error,
    isLoading,
  } = useGetAPI<Log[]>(
    `${endpoints.logs}?offset=${CurrentOffset}${
      selectedUserID ? `&&user-id=${selectedUserID}` : ''
    }`,
  );
  const [isGantt, setIsGantt] = useState(false);

  const Period = () => {
    if (isLoading) return <Loading message='滞在情報取得中' />;
    if (error) return <Error message='滞在情報取得失敗' />;
    if (logs)
      return [...logs].map((log) => {
        if (log.endAt === '2016-01-01 00:00:00') {
          //退出してない場合
          return (
            <tr className='text-left' key={log.id}>
              <td className='border py-2 md:px-4 '>{log.startAt.substring(0, 10)}</td>
              <td className='border px-4 py-2'>{log.name}</td>
              <td className='border px-4 py-2'>
                {log.startAt.substring(10, log.startAt.length - 3)} -
              </td>
              <td className='border px-4 py-2'>{log.room}</td>
            </tr>
          );
        }
        return (
          <tr className='text-left' key={log.id}>
            <td className='border py-2 md:px-4'>{log.startAt.substring(0, 10)}</td>
            <td className='border px-4 py-2'>{log.name}</td>
            <td className='border px-4 py-2'>
              {log.startAt.substring(10, log.startAt.length - 3)} -
              {log.endAt.substring(10, log.endAt.length - 3)}
            </td>
            <td className='border px-4 py-2'>{log.room}</td>
          </tr>
        );
      });
  };

  return (
    <div>
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
          <div>{RoomHistoryComponents.UserSelecter(selectedUserID)}</div>
        </div>
      </div>
      {isGantt ? (
        <div>
          <div className='my-4 border' />
          <RoomTabDate />
        </div>
      ) : (
        <div>
          <table className='w-full table-fixed text-xs sm:text-base md:text-2xl'>
            <thead>
              <tr className='bg-staywatch-black text-left text-white'>
                <th className='w-1/5 border px-4  py-2'>日にち</th>
                <th className=' border  px-4'>名前</th>
                <th className=' border px-4'>時刻</th>
                <th className=' border px-4'>部屋</th>
              </tr>
            </thead>
            <tbody className=''>{Period()}</tbody>
          </table>
        </div>
      )}
      {(() => {
        if (width > 853) {
          return (
            <div>
              <div className='fixed inset-y-1/2 left-4'>
                {RoomHistoryComponents.PrevButton(CurrentPage, PreviousPage)}
              </div>
              <div className='fixed inset-y-1/2 right-4'>
                {RoomHistoryComponents.NextButton(CurrentPage, NextPage, HistoryCount)}
              </div>
            </div>
          );
        }
        return (
          <div className='mt-2 flex h-10 w-full justify-between text-white md:mt-4'>
            <div>{RoomHistoryComponents.PrevButton(CurrentPage, PreviousPage)}</div>
            <div>{RoomHistoryComponents.NextButton(CurrentPage, NextPage, HistoryCount)}</div>
          </div>
        );
      })()}
    </div>
  );
};

export default RoomHistory;
