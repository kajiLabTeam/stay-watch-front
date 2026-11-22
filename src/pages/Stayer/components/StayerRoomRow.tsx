import { StayerItem } from './StayerItem';
import { StayersRoomTableType } from '../types/stayer';

interface StayerRoomRowProps {
  stayersInRoom: StayersRoomTableType;
}

export function StayerRoomRow({ stayersInRoom }: StayerRoomRowProps) {
  return (
    <tr className='border text-left'>
      <td className='px-2 text-sm md:text-2xl'>{stayersInRoom.room}</td>
      <td className='border'>
        {stayersInRoom.stayers.map((stayer) => (
          <StayerItem key={stayer.name} stayer={stayer} />
        ))}
      </td>
    </tr>
  );
}
