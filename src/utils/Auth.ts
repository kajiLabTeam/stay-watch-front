import { ApiError, request } from '@/utils/api';
import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  UserCredential,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { endpoints } from './endpoint';
import { useUserMutators, useUserState } from '@/globalStates/firebaseUserState';
import { useCommunityMutators } from '@/globalStates/useCommunityState';
import { useUserEmailMutators, useUserEmailState } from '@/globalStates/userEmailState';
import { useUserRoleMutators } from '@/globalStates/userRoleState';
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

export const useIsSigned = (): boolean | undefined => {
  const [isSigned, setIsSigned] = useState<boolean | undefined>();
  const { setUserState } = useUserMutators();

  useEffect(() => {
    const auth = getAuth(app);
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserState(user);
        setIsSigned(true);
      } else {
        setIsSigned(false);
      }
    });
  }, [setUserState]);

  return isSigned;
};

export const useIsRegisterEmail = (): {
  isRegisteredEmail: boolean | undefined;
  status: number;
} => {
  const [isRegisteredEmail, setIsRegisteredEmail] = useState<boolean | undefined>();
  const [status, setStatus] = useState<number>(0);
  const { setUserRole } = useUserRoleMutators();
  const { setCommunity } = useCommunityMutators();
  const user = useUserState();
  const email = useUserEmailState();
  const { setUserEmail } = useUserEmailMutators();

  useEffect(() => {
    if (email) {
      setIsRegisteredEmail(true);
    }
    if (!email && user) {
      const checkRegisterdEmail = async () => {
        try {
          const token = await user.getIdToken();
          const resUser = await request<User>(endpoints.check, { token });
          setIsRegisteredEmail(true);

          setUserRole(resUser.role);
          setStatus(200);
          setCommunity({
            communityId: resUser.communityId,
            communityName: resUser.communityName,
          });
          setUserEmail(resUser.email);
        } catch (error) {
          if (error instanceof ApiError) {
            console.error(error.message);
            setStatus(error.status);
          }
          setIsRegisteredEmail(false);
        }
      };
      checkRegisterdEmail();
    }
  }, [setUserRole, setCommunity, user]);

  return { isRegisteredEmail, status };
};
