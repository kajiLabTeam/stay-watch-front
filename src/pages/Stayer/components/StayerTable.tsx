import { StayerRoomRow } from './StayerRoomRow';
import { StayersRoomTableType } from '../types/stayer';

interface StayerTableProps {
  stayersByRoom: readonly StayersRoomTableType[];
}

export function StayerTable({ stayersByRoom }: StayerTableProps) {
  return (
    <div>
      <table className='mt-5 w-full table-fixed rounded border text-xs shadow sm:text-base md:text-2xl'>
        <thead>
          <tr className='bg-staywatch-black text-left text-white'>
            <th className='w-4/12 border py-2 pl-4 md:w-3/12'>部屋</th>
            <th className='w-8/12 border py-2 pl-4 md:w-9/12'>名前</th>
          </tr>
        </thead>
        <tbody>
          {stayersByRoom.map((stayersInRoom) => (
            <StayerRoomRow key={stayersInRoom.room} stayersInRoom={stayersInRoom} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
