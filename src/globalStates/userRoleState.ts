import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

const userRole = atom<number | null>({
  key: 'userRole',
  default: null,
  dangerouslyAllowMutability: true,
});

export const useUserRoleState = (): number | null => {
  return useRecoilValue(userRole);
};

export const useUserRoleMutators = () => {
  const setUserRole = useSetRecoilState(userRole);

  return {
    setUserRole,
  };
};
