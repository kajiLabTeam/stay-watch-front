import React from 'react';
import { StayLogTableBody } from './StayLogTableBody';
import { Log } from '@/types/log';

type StayLogTableProps = {
  stayLogs: Log[];
};

export const StayLogTable = ({ stayLogs }: StayLogTableProps) => {
  return (
    <>
      <table className='w-full table-fixed text-xs sm:text-base md:text-2xl'>
        <thead>
          <tr className='bg-staywatch-black text-left text-white'>
            <th className='w-1/5 border px-4  py-2'>日にち</th>
            <th className=' border  px-4'>名前</th>
            <th className=' border px-4'>時刻</th>
            <th className=' border px-4'>部屋</th>
          </tr>
        </thead>
        <StayLogTableBody stayLogs={stayLogs} />
      </table>
    </>
  );
};
