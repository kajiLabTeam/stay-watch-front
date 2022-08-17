export type User = {
  id: number;
  name: string;
  tags: [
    {
      id: number;
      name: string;
    }
  ];
};

export type UserDetail = User & {
  uuid: string;
  email: string;
  role: number;
};
