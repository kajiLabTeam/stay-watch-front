import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

const loadingState = atom({
  key: 'loadingAtom',
  default: {
    isLoading: false,
  },
});

export const useLoadingState = () => {
  return useRecoilValue(loadingState);
};

export const useLoadingMutators = () => {
  const setLoading = useSetRecoilState(loadingState);

  const setIsLoading = (isLoading: boolean) => {
    setLoading((prev) => ({
      ...prev,
      isLoading,
    }));
  };

  return {
    setIsLoading,
  };
};
