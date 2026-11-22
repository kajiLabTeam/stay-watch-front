import { atom, useAtomValue, useSetAtom } from 'jotai';

const userRole = atom<number | null>(null);

export const useUserRoleState = (): number | null => {
  return useAtomValue(userRole);
};

export const useUserRoleMutators = () => {
  const setUserRole = useSetAtom(userRole);

  return {
    setUserRole,
  };
};
