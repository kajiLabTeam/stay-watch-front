import { atom } from 'recoil';

export const userRole = atom<number | null>({
  key: 'userRole',
  default: null,
  dangerouslyAllowMutability: true,
});
