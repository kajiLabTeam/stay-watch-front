import { Select } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import Image from 'next/image';
import { useState } from 'react';
import { useWindowSize } from 'usehooks-ts';
import RoomTabDate from './RoomTabDate';
import { useCurrentPage } from './roomHistoryhook';
import { Button } from '@/components/common/Button';
import Error from '@/components/common/Error';
import Loading from '@/components/common/Loading';
import { useGetAPI } from '@/hooks/useGetAPI';
import Log from '@/types/log';
import { UserAttribute } from '@/types/user';
import { endpoints } from '@/utils/endpoint';

const RoomHistory = () => {
  useDocumentTitle('滞在者履歴');
  const { width } = useWindowSize();

  const [page, PreviousPage, NextPage] = useCurrentPage();
  const [selectedUserID, setSelectedUserID] = useState<string | null>(null);
  const { data: logs, error, isLoading } = useGetAPI<Log[]>(
    `${endpoints.logs}?${selectedUserID ? `user-id=${selectedUserID}` : ''}`);
  // user-id が入力された場合
  const handleUserChange = (value: string | null) => {
    setSelectedUserID(value);
  };
  const [isGantt, setIsGantt] = useState(false);

  const nextButton = () => {
    //最後のデータだった時
    if (logs) {
      if (logs.slice(-1)[0]?.id === 1) {
        return <div />;
      }
      return (
        <Button color='blue' onClick={NextPage}>
          次へ
        </Button>
      );
    }
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

  const userSelecter = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: users, error, isLoading } = useGetAPI<UserAttribute[]>(`${endpoints.users}`);
    if (isLoading) return <Loading message='利用者情報取得中' />;
    if (error) return <Error message='利用者情報取得失敗' />;
    if (users)
      return (
        <Select
          placeholder="user name"
          data={
            users
              ? users.map(user => ({
                value: user.id.toString(),
                label: user.name
              }))
              : []
          }
          searchable
          nothingFoundMessage="ユーザが見つかりません"
          onChange={handleUserChange}
        />
      );
  };

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
          <div>{userSelecter()}</div>
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
              <div className='fixed inset-y-1/2 left-4'>{prevButton()}</div>
              <div className='fixed inset-y-1/2 right-4'>{nextButton()}</div>
            </div>
          );
        }
        return (
          <div className='mt-2 flex h-10 w-full justify-between text-white md:mt-4'>
            <div>{prevButton()}</div>
            <div>{nextButton()}</div>
          </div>
        );
      })()}
    </div>
  );
};

export default RoomHistory;
