export type User = {
  id: number;
  name: string;
  uuid: string;
  email: string;
  role: number;
  communityId: number;
  communityName: string;
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

export type UserEditor = User & {
  beaconUuidEditable: boolean;
  beaconName: string;
  tags: [
    {
      id: number;
      name: string;
    },
  ];
};
