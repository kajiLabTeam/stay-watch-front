import { atom, useAtomValue, useSetAtom } from 'jotai';

const alertModeState = atom({
  alertMode: -1,
});

export const useAlertModeState = () => {
  return useAtomValue(alertModeState);
};

export const useAlertModeMutators = () => {
  const setAlert = useSetAtom(alertModeState);

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
