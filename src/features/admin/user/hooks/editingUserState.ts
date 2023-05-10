import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { Tag } from '@/types/tag';

export const useRoles = () => {
  const roles = [
    { value: 1, label: '利用者' },
    { value: 2, label: '管理者' },
  ];
  return roles;
};

export const useTagIds = (tags: Tag[]) => {
  const tagIds: number[] = [];
  for (let i = 0; i < tags.length; i++) {
    tagIds.push(tags[i].id);
  }
  return tagIds;
};

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
