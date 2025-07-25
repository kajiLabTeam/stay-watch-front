import React from 'react';
import { Log } from '@/types/log';

type StayLogTableBodyProps = {
  stayLogs: Log[];
};

export const StayLogTableBody = ({ stayLogs }: StayLogTableBodyProps) => {
  return (
    <tbody>
      {stayLogs.map((stayLog) => {
        if (stayLog.endAt === '2016-01-01 00:00:00') {
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
  // if (stayLogs){
  //   return [...stayLogs].map((log) => {
  //     // {log.map((log:)=>{
  //     if (log.endAt === '2016-01-01 00:00:00') {
  //       //退出してない場合
  //       return (
  //         <tr className='text-left' key={log.id}>
  //           <td className='border py-2 md:px-4 '>{log.startAt.substring(0, 10)}</td>
  //           <td className='border px-4 py-2'>{log.name}</td>
  //           <td className='border px-4 py-2'>
  //             {log.startAt.substring(10, log.startAt.length - 3)} -
  //           </td>
  //           <td className='border px-4 py-2'>{log.room}</td>
  //         </tr>
  //       );
  //     }
  //     return (
  //       <tr className='text-left' key={log.id}>
  //         <td className='border py-2 md:px-4'>{log.startAt.substring(0, 10)}</td>
  //         <td className='border px-4 py-2'>{log.name}</td>
  //         <td className='border px-4 py-2'>
  //           {log.startAt.substring(10, log.startAt.length - 3)} -
  //           {log.endAt.substring(10, log.endAt.length - 3)}
  //         </td>
  //         <td className='border px-4 py-2'>{log.room}</td>
  //       </tr>
  //     );
  //   });
  // }
  // return (
  //   <tbody>

  //   </tbody>
  //   )
};
