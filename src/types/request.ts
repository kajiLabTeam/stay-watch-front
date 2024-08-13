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

export type UpdateUserRequest = UserRequestBase & {
  id: number;
};
