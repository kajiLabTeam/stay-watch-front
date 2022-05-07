type User = {
  id: string;
  name: string;
  team: string;
  tags: [
    {
      id: number;
      name: string;
    }
  ];
};

export default User;
