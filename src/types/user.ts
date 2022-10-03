export type User = {
  id: number;
  name: string;
  uuid: string;
  email: string;
  role: number;
};

export type UserAttribute = User & {
  tags: [
    {
      id: number;
      name: string;
    }
  ];
};
