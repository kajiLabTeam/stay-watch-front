import { ApiError, request } from '@/utils/api';
import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  UserCredential,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from './endpoint';
import { useUserState } from '@/atoms/firebaseUserAtom';
import { useCommunityMutators } from '@/atoms/communityAtom';
import { useUserEmailMutators, useUserEmailState } from '@/atoms/userEmailAtom';
import { useUserRoleMutators } from '@/atoms/userRoleAtom';
import { User } from '@/types/user';
import { app } from '@/utils/firebase';

export const login = (): Promise<UserCredential> | Promise<void> => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const environment = import.meta.env.VITE_NODE_ENV;
  // 本番環境
  if (environment === 'production') return signInWithRedirect(auth, provider);

  // 開発環境・設定されていない場合はPopupでやる
  return signInWithPopup(auth, provider); // ローカルホストで実行する際はPopupでないとサインインできないため注意
};

export const logout = (): Promise<void> => {
  const auth = getAuth(app);
  return signOut(auth);
};

export const useIsRegisterEmail = (): {
  isRegisteredEmail: boolean | undefined;
  status: number;
} => {
  const { setUserRole } = useUserRoleMutators();
  const { setCommunity } = useCommunityMutators();
  const user = useUserState();
  const email = useUserEmailState();
  const { setUserEmail } = useUserEmailMutators();

  const { isSuccess, isError, error } = useQuery<User, Error>({
    queryKey: ['checkRegisteredEmail', user?.uid],
    enabled: !email && !!user,
    retry: false,
    queryFn: async () => {
      // enabled により user は存在するが、型上の絞り込みのためチェックする
      if (!user) throw new Error('user is not signed in');
      const token = await user.getIdToken();
      const resUser = await request<User>(ENDPOINTS.check, { token });

      setUserRole(resUser.role);
      setCommunity({
        communityId: resUser.communityId,
        communityName: resUser.communityName,
      });
      setUserEmail(resUser.email);
      return resUser;
    },
  });

  if (email || isSuccess) {
    return { isRegisteredEmail: true, status: 200 };
  }
  if (!isError) {
    return { isRegisteredEmail: undefined, status: 0 };
  }
  if (!(error instanceof ApiError)) {
    return { isRegisteredEmail: false, status: 0 };
  }
  console.error(error.message);
  return { isRegisteredEmail: false, status: error.status };
};
