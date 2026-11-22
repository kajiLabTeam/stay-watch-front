// useZodForm の制約(Record<string, unknown>)を満たすため interface ではなく type で定義する
export type UserFormValues = {
  name: string;
  uuid: string;
  email: string;
  role: string;
  communityId: number;
  beaconName: string;
  tagNames: string[];
};
