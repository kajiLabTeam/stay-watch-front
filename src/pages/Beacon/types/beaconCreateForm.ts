// useZodForm の制約(Record<string, unknown>)を満たすため interface ではなく type で定義する
export type BeaconCreateFormValues = {
  name: string;
  email: string;
  role: string;
  communityId: number;
  tagNames: string[];
};
