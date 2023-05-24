type Props = {
  roomName: string;
  userNames: string[];
};

const PopoverUser = (props: Props) => {
  return (
    <div className='mt-2 bg-slate-200 p-[5%]'>
      <p>{props.roomName}</p>
      {props.userNames.map((userName: string) => (
        <p key={userName}>{userName}</p>
      ))}
    </div>
  );
};

export default PopoverUser;
