'use client';
type Props = {
  roomName: string;
  userNames: string[];
};

const PopoverUser = ({ roomName, userNames }: Props) => {
  return (
    <div className='mt-2 min-w-fit whitespace-nowrap border-2 border-gray-500 bg-white p-[5%] shadow-md'>
      <p className='text-gray-500'>{roomName}</p>
      {userNames.map((userName: string, index: number) => (
        <p key={index}>{userName}</p>
      ))}
    </div>
  );
};

export default PopoverUser;
