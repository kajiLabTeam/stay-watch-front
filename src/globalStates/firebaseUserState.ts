import firebase from 'firebase/auth';
import { atom, useAtomValue, useSetAtom } from 'jotai';

const userState = atom<firebase.User | null>(null);

export const useUserState = (): firebase.User | null => {
  return useAtomValue(userState);
};

export const useUserMutators = () => {
  const setUserState = useSetAtom(userState);

  return {
    setUserState,
  };
};
