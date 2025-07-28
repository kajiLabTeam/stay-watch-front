import React from 'react';
import { Log } from '@/types/log';

type StayLogTableBodyProps = {
  stayLogs: Log[];
};

export const StayLogTableBody = ({ stayLogs }: StayLogTableBodyProps) => {
  const ONGOING_STAY_MARKER = '2016-01-01 00:00:00';
  return (
    <tbody>
      {stayLogs.map((stayLog) => {
        if (stayLog.endAt === ONGOING_STAY_MARKER) {
          // 退出していない場合
          return (
            <tr className='text-left' key={stayLog.id}>
              <td className='border py-2 md:px-4 '>{stayLog.startAt.substring(0, 10)}</td>
              <td className='border px-4 py-2'>{stayLog.name}</td>
              <td className='border px-4 py-2'>
                {stayLog.startAt.substring(10, stayLog.startAt.length - 3)} -
              </td>
              <td className='border px-4 py-2'>{stayLog.room}</td>
            </tr>
          );
        }
        return (
          <tr className='text-left' key={stayLog.id}>
            <td className='border py-2 md:px-4'>{stayLog.startAt.substring(0, 10)}</td>
            <td className='border px-4 py-2'>{stayLog.name}</td>
            <td className='border px-4 py-2'>
              {stayLog.startAt.substring(10, stayLog.startAt.length - 3)} -
              {stayLog.endAt.substring(10, stayLog.endAt.length - 3)}
            </td>
            <td className='border px-4 py-2'>{stayLog.room}</td>
          </tr>
        );
      })}
    </tbody>
  );
};
