interface RoomHeaderRowProps {
  roomId: number;
  roomName: string;
  buttonText: string;
  onButtonClicked: () => void;
}

export function RoomHeaderRow({
  roomId,
  roomName,
  buttonText,
  onButtonClicked,
}: RoomHeaderRowProps) {
  return (
    <div className='flex'>
      <div className='w-3/4'>{roomName}</div>
      <button
        id={`form_edit_button${roomId}`}
        className='w-1/4 text-center'
        onClick={onButtonClicked}
      >
        {buttonText}
      </button>
    </div>
  );
}
