import axios from 'axios';
import { useCallback } from 'react';
import { useSWRConfig } from 'swr';
import { useAlertModeMutators } from '@/features/admin/user/hooks/alertModeState';
import { useEditingUserMutators } from '@/features/admin/user/hooks/editingUserState';
import { useLoadingMutators } from '@/features/admin/user/hooks/loadingState';
import { endpoints } from '@/utils/api';

export const useUserAdminFormMutators = () => {
  const { setAlertMode } = useAlertModeMutators();
  const displayAlert = (alertMode: number) => {
    setAlertMode(alertMode);
    setTimeout(() => {
      setAlertMode(-1);
    }, 3000);
  };

  const { mutate } = useSWRConfig();
  const { setEditingUserId } = useEditingUserMutators();
  const { setIsLoading } = useLoadingMutators();

  // ユーザの削除処理
  const deleteUser = useCallback(
    (userId: number) => {
      if (userId) {
        axios
          .delete(`${endpoints.users2}/${userId}`)
          .then(() => {
            mutate(endpoints.adminUsers);
            displayAlert(3);
          })
          .catch((err) => {
            console.error(err);
            window.alert('失敗しました');
          });
      } else {
        window.alert('失敗しました');
      }
    },
    // ここにdisplayAlertを入れないとwarningが出るが、displayAlertをここには入れたくないため
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setAlertMode, mutate, displayAlert],
  );

  // ユーザの更新処理
  const updateUser = useCallback(
    (values) => {
      if (values) {
        axios
          .put(endpoints.users2, values)
          .then(() => {
            mutate(endpoints.adminUsers);
            displayAlert(2);
            setEditingUserId(-1);
          })
          .catch((err) => {
            if (err.response.status === 409) {
              window.alert('このメールアドレスは既に登録されています');
            } else {
              window.alert('失敗しました');
            }
            console.error(err.response.status);
          });
      } else {
        window.alert('失敗しました');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setAlertMode, mutate, displayAlert],
  );

  // ユーザの登録処理
  const createUser = useCallback(
    (values, form) => {
      if (values) {
        setIsLoading(true);
        axios
          .post(endpoints.users2, values)
          .then(() => {
            mutate(endpoints.adminUsers);
            displayAlert(1);
            form.reset();
          })
          .catch((err) => {
            if (err.response.status === 409) {
              window.alert('このメールアドレスは既に登録されています');
            } else {
              window.alert('失敗しました');
            }
            console.error(err.response.status);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        window.alert('失敗しました');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setAlertMode, mutate, displayAlert],
  );

  return {
    deleteUser,
    updateUser,
    createUser,
  };
};
