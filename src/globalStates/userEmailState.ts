import { atom, useAtomValue, useSetAtom } from 'jotai';

const userEmail = atom<string | null>(null);

export const useUserEmailState = (): string | null => {
  return useAtomValue(userEmail);
};

export const useUserEmailMutators = () => {
  const setUserEmail = useSetAtom(userEmail);
  return {
    setUserEmail,
  };
};
