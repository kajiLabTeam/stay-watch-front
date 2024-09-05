import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

const userEmail = atom<string | null>({
  key: 'userEmail',
  default: null,
  dangerouslyAllowMutability: true,
});

export const useUserEmailState = (): string | null => {
  return useRecoilValue(userEmail);
};

export const useUserEmailMutators = () => {
  const setUserEmail = useSetRecoilState(userEmail);
  return {
    setUserEmail,
  };
};
