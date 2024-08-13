import axios, { AxiosResponse } from 'axios';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  // signInWithPopup,
  // UserCredential,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { endpoints } from './endpoint';
import { useUserMutators, useUserState } from '@/globalStates/firebaseUserState';
import { useCommunityMutators } from '@/globalStates/useCommunityState';
import { useUserRoleMutators } from '@/globalStates/userRoleState';
import { User } from '@/types/user';
import { app } from '@/utils/firebase';

export const login = (): Promise<void> => {
  // export const login = (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  return signInWithRedirect(auth, provider);
  //return signInWithPopup(auth, provider); // ローカルホストで実行する際はPopupでないとサインインできないため注意
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

export const useIsRegisterEmail = (): {isRegisteredEmail: boolean | undefined, status: number} => {
  const [isRegisteredEmail, setIsRegisteredEmail] = useState<boolean | undefined>();
  const [status, setStatus] = useState<number>(0);
  const { setUserRole } = useUserRoleMutators();
  const { setCommunity } = useCommunityMutators();
  const user = useUserState();

  useEffect(() => {
    if (user) {
      const checkRegisterdEmail = async () => {
        try {
          const token = await user.getIdToken();
          const resUser: AxiosResponse<User> = await axios.get(endpoints.check, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIsRegisteredEmail(true);

          setUserRole(resUser.data.role);
          setStatus(resUser.status);
          setCommunity({
            communityId: resUser.data.communityId,
            communityName: resUser.data.communityName,
          });
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            console.error(error.message); //Axiosの例外オブジェクトとして扱える
            setStatus(error.response?.status);
          }
          setIsRegisteredEmail(false);
        }
      };
      checkRegisterdEmail();
    }
  }, [setUserRole, setCommunity, user]);

  return {isRegisteredEmail, status};
};
