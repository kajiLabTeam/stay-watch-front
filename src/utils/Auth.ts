import axios, { AxiosResponse } from 'axios';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { endpoints } from './api';
import { useUserMutators, useUserState } from '@/globalStates/firebaseUserState';
import { useUserRoleMutators } from '@/globalStates/userRoleState';
import { User } from '@/types/user';
import { app } from '@/utils/firebase';

export const login = (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  return signInWithRedirect(auth, provider);
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

export const useIsRegisterEmail = (): boolean | undefined => {
  const [isRegisteredEmail, setIsRegisteredEmail] = useState<boolean | undefined>();
  const [, setStatusCode] = useState<number | undefined>();
  const { setUserRole } = useUserRoleMutators();
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
          setStatusCode(resUser.status);
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            console.log(error.message); //Axiosの例外オブジェクトとして扱える
            setStatusCode(error.response?.status);
          }
          setIsRegisteredEmail(false);
        }
      };
      checkRegisterdEmail();
    }
  }, [setUserRole, user]);

  return isRegisteredEmail;
};
