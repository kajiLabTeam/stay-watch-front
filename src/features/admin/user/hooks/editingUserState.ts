import axios from 'axios';
import { useCallback } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { useSWRConfig } from 'swr';
import { useAlertModeMutators } from '@/features/admin/user/hooks/alertModeState';
import { Tag } from '@/types/tag';
import { endpoints } from '@/utils/api';

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

  const { setAlertMode } = useAlertModeMutators();
  const displayAlert = (alertMode: number) => {
    setAlertMode(alertMode);
    setTimeout(() => {
      setAlertMode(-1);
    }, 3000);
  };

  const { mutate } = useSWRConfig();
  // フォームの「削除」を押されたときの処理
  const deleteUser = useCallback(
    (userId: number) => {
      if (userId) {
        axios
          .delete(`${endpoints.users2}/${userId}`)
          .then(() => {
            mutate(endpoints.adminUsers);
            displayAlert(2);
          })
          .catch((err) => {
            console.error(err);
            window.alert('失敗しました');
          });
      } else {
        window.alert('失敗しました');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setAlertMode, mutate, displayAlert],
  );

  return {
    setEditingUserId,
    deleteUser,
  };
};
