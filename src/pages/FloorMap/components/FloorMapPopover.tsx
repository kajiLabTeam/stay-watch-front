import PopoverUser from './PopoverUser';
import { PopoverRoom } from '@/types/roomFloormap';

interface FloorMapPopoverProps {
  popoverRoom: PopoverRoom;
  canvasClientHeight: number;
}

export default function FloorMapPopover({ popoverRoom, canvasClientHeight }: FloorMapPopoverProps) {
  return (
    <div
      className='absolute align-bottom text-red-400'
      style={{
        // ポップオーバーの位置、フォントサイズ
        left: popoverRoom.left + popoverRoom.left / 40,
        top: popoverRoom.top - popoverRoom.top / 20,
        fontSize: canvasClientHeight / 40,
      }}
    >
      <PopoverUser roomName={popoverRoom.roomName} userNames={popoverRoom.userNames} />
    </div>
  );
}
