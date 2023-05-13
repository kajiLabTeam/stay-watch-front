import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

const alertModeState = atom({
  key: 'editingAlertAtom',
  default: {
    alertMode: -1,
  },
});

export const useAlertModeState = () => {
  return useRecoilValue(alertModeState);
};

export const useAlertModeMutators = () => {
  const setAlert = useSetRecoilState(alertModeState);

  const setAlertMode = (alertMode: number) => {
    setAlert((prev) => ({
      ...prev,
      alertMode,
    }));
  };

  return {
    setAlertMode,
  };
};
