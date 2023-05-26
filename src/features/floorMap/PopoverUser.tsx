type Props = {
  roomName: string;
  userNames: string[];
};

const PopoverUser = (props: Props) => {
  return (
    <div className='mt-2 min-w-fit whitespace-nowrap border-2 border-gray-500 bg-white p-[5%] shadow-md'>
      <p className='text-gray-500'>{props.roomName}</p>
      {props.userNames.map((userName: string) => (
        <p key={userName}>{userName}</p>
      ))}
    </div>
  );
};

export default PopoverUser;
