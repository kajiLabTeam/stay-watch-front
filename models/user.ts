type User = {
  id: number;
  name: string;
  tags: [
    {
      id: number;
      name: string;
    }
  ];
};

export default User;
