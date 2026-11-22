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
import { endpoints } from './endpoint';
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
  if (environment === 'production') {
    // 本番環境
    return signInWithRedirect(auth, provider);
  } else if (environment === 'development') {
    // 開発環境
    return signInWithPopup(auth, provider); // ローカルホストで実行する際はPopupでないとサインインできないため注意
  }
  // 設定されていない場合Popupでやる
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
      const resUser = await request<User>(endpoints.check, { token });

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
  if (isError) {
    if (error instanceof ApiError) {
      console.error(error.message);
      return { isRegisteredEmail: false, status: error.status };
    }
    return { isRegisteredEmail: false, status: 0 };
  }
  return { isRegisteredEmail: undefined, status: 0 };
};
