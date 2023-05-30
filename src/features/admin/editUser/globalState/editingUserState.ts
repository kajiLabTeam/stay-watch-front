import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

const editingUserState = atom({
  key: 'editingUserAtom',
  default: {
    editingUserId: -1,
  },
});

export const useEditingUserState = () => {
  return useRecoilValue(editingUserState);
};

export const useEditingUserMutators = () => {
  const setEditingUser = useSetRecoilState(editingUserState);

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
