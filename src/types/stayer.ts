type StayerType = {
  id: number;
  name: string;
  room: string;
  roomId: number;
  tags: [
    {
      id: number;
      name: string;
    }
  ];
};

export default StayerType;
