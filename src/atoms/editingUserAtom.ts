import { atom, useAtomValue, useSetAtom } from 'jotai';

const editingUserState = atom({
  editingUserId: -1,
});

export const useEditingUserState = () => {
  return useAtomValue(editingUserState);
};

export const useEditingUserMutators = () => {
  const setEditingUser = useSetAtom(editingUserState);

  const setEditingUserId = (editingUserId: number) => {
    setEditingUser((prev) => ({
      ...prev,
      editingUserId,
    }));
  };

  return {
    setEditingUserId,
  };
};
