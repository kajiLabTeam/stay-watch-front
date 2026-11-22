import { useQuery } from '@tanstack/react-query';
import { useUserState } from '@/atoms/firebaseUserAtom';
import { useVerifiedUserMutators, useVerifiedUserState } from '@/atoms/verifiedUserAtom';
import { User } from '@/types/user';
import { ApiError, request } from '@/utils/api';
import { ENDPOINTS } from '@/utils/endpoint';

/**
 * 権限確認(check)の結果を返す。
 * 前回の結果(キャッシュ)があれば確認を待たずに登録済みとして扱い、裏で再取得して更新する。
 */
export const useIsRegisterEmail = (): {
  isRegisteredEmail: boolean | undefined;
  status: number;
} => {
  const user = useUserState();
  const verifiedUser = useVerifiedUserState();
  const { setVerifiedUser, clearVerifiedUser } = useVerifiedUserMutators();

  const { error } = useQuery<User, Error>({
    queryKey: ['checkRegisteredEmail', user?.uid],
    enabled: user !== null,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    queryFn: async () => {
      // enabled により user は存在するが、型上の絞り込みのためチェックする
      if (!user) throw new Error('user is not signed in');
      const token = await user.getIdToken();

      try {
        const resUser = await request<User>(ENDPOINTS.check, { token });
        setVerifiedUser({
          uid: user.uid,
          role: resUser.role,
          communityId: resUser.communityId,
          communityName: resUser.communityName,
        });
        return resUser;
      } catch (error) {
        // 未登録などの判定結果が返ってきた場合はキャッシュを破棄する(通信エラーでは残す)
        if (error instanceof ApiError) clearVerifiedUser();
        throw error;
      }
    },
  });

  if (error instanceof ApiError) {
    console.error(error.message);
    return { isRegisteredEmail: false, status: error.status };
  }
  if (verifiedUser) return { isRegisteredEmail: true, status: 200 };
  if (error) return { isRegisteredEmail: false, status: 0 };

  return { isRegisteredEmail: undefined, status: 0 };
};
