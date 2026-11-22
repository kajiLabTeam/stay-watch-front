import { atom, useAtomValue } from 'jotai';
import { verifiedUserState } from '@/atoms/verifiedUserAtom';

const userRoleState = atom((get): number | null => get(verifiedUserState)?.role ?? null);

export const useUserRoleState = (): number | null => {
  return useAtomValue(userRoleState);
};
