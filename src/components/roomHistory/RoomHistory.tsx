import Image from 'next/image';
import { useState } from 'react';
import useSWR from 'swr';

import { useWindowSize } from 'usehooks-ts';
import { useCurrentPage } from '../../hooks/roomHistoryhook';
import { Button } from '../common/Button';
import RoomTabDate from './RoomTabDate';
import Log from '@/types/log';
import { endpoints } from '@/utils/api';

const RoomHistory = () => {
  const { width } = useWindowSize();

  const [page, PreviousPage, NextPage] = useCurrentPage();
  const { data: logs, error } = useSWR<Log[]>(`${endpoints.logs}?page=${page}`);
  const [isGantt, setIsGantt] = useState(false);

  if (error)
    return (
      <div>
        <div className='mt-6 text-4xl'>滞在者履歴</div>
        <div className='my-4 border' />
      </div>
    );
  if (!logs) return <div>loading...</div>;

  const nextButton = () => {
    //最後のデータだった時
    if (logs.slice(-1)[0]?.id == 1) {
      return <div />;
    }
    return (
      <Button color='blue' onClick={NextPage}>
        次へ
      </Button>
    );
  };

  const prevButton = () => {
    //pageが1より大きい時にボタンを表示
    if (page > 1) {
      return (
        <Button color='blue' onClick={PreviousPage}>
          前へ
        </Button>
      );
    }
    return <div />;
  };

  const Period = () => {
    return [...logs].map((log) => {
      if (log.endAt === '2016-01-01 00:00:00') {
        //退出してない場合
        return (
          <tr className='text-left' key={log.id}>
            <td className='border py-2 md:px-4 '>{log.startAt.substring(0, 10)}</td>
            <td className='border py-2 px-4'>{log.name}</td>
            <td className='border py-2 px-4'>
              {log.startAt.substring(10, log.startAt.length - 3)} ~
            </td>
            <td className='border py-2 px-4'>{log.room}</td>
          </tr>
        );
      } else {
        return (
          <tr className='text-left' key={log.id}>
            <td className='border py-2 md:px-4'>{log.startAt.substring(0, 10)}</td>
            <td className='border py-2 px-4'>{log.name}</td>
            <td className='border py-2 px-4'>
              {log.startAt.substring(10, log.startAt.length - 3)} ~
              {log.endAt.substring(10, log.endAt.length - 3)}
            </td>
            <td className='border py-2 px-4'>{log.room}</td>
          </tr>
        );
      }
    });
  };

  return (
    <div>
      <div className='mt-6 flex justify-between text-2xl md:text-3xl'>
        <div>滞在者履歴</div>
        <div>
          <button
            onClick={() => {
              setIsGantt(!isGantt);
            }}
          >
            {isGantt ? (
              <Image src='/ganttAnother.png' alt='stayer' width={27} height={27} />
            ) : (
              <Image src='/gantt.png' alt='stayer' width={27} height={27} />
            )}
          </button>
        </div>
      </div>
      {isGantt ? (
        <div>
          <div className='my-4 border' />
          <RoomTabDate />
        </div>
      ) : (
        <div>
          <div className='my-4 border' />
          <table className='w-full table-fixed text-xs sm:text-base md:text-2xl'>
            <thead>
              <tr className='bg-gray-700 text-left text-white'>
                <th className='w-1/5 border py-2  px-4'>Date</th>
                <th className=' border  px-4'>Name</th>
                <th className=' border px-4'>Period</th>
                <th className=' border px-4'>Room</th>
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
              <div className='fixed inset-y-1/2 left-4'>{prevButton()}</div>
              <div className='fixed inset-y-1/2 right-4'>{nextButton()}</div>
            </div>
          );
        } else {
          return (
            <div className='mt-2 flex h-10 w-full justify-between text-white md:mt-4'>
              <div>{prevButton()}</div>
              <div>{nextButton()}</div>
            </div>
          );
        }
      })()}
    </div>
  );
};

export default RoomHistory;
