type UserRequestBase = {
  name: string;
  uuid: string;
  email: string;
  role: number;
  communityId: number;
  beaconName: string;
  tagIds: number[];
};

export type CreateUserRequest = UserRequestBase;

export type CreatePrivateBeaconUserRequest = UserRequestBase & {
  privateKey: string;
};

export type UpdatePrivateBeaconUserRequest = {
  id: number;
  beaconName: string;
  privateKey: string;
};

export type UpdateUserRequest = UserRequestBase & {
  id: number;
};
