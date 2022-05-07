type Stayer = {
  id: string;
  name: string;
  team: string;
  room: string;
  roomID: number;
  tags: [
    {
      id: number;
      name: string;
    }
  ];
};

export default Stayer;
