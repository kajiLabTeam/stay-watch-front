import firebase from 'firebase/auth';
import { atom } from 'recoil';

export const userState = atom<firebase.User | null>({
  key: 'userState',
  default: null,
  dangerouslyAllowMutability: true,
});
