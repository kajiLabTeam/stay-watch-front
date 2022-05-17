type Stayer = {
  id: number;
  name: string;  
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
