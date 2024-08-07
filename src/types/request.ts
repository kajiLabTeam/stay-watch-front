export type CreateUserRequest = {
  name: string;
  uuid: string;
  email: string;
  role: number;
  communityId: number;
  beaconName: string;
  tagIds: number[];
}