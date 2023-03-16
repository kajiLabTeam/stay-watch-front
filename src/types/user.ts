export type User = {
  id: number;
  name: string;
  uuid: string;
  email: string;
  role: number;
};

export type UserAttribute = {
  id: number;
  name: string;
  tags: [
    {
      id: number;
      name: string;
    },
  ];
};

export type extendedUser = {
  id: number;
  name: string;
  uuid: string;
  email: string;
  role: number;
  tags: [
    {
      id: number;
      name: string;
    },
  ];
};
