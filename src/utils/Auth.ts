import axios, { AxiosResponse } from 'axios';
import { signOut, signInWithRedirect } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { endpoints } from './api';
import { useUserRoleMutators } from '@/globalStates/userRoleState';
import { User } from '@/types/user';
import { auth, provider } from '@/utils/firebase';

export const login = () => {
  return signInWithRedirect(auth, provider);
};

export const logout = (): Promise<void> => {
  return signOut(auth);
};

// export const useIsSigned = (): boolean | undefined => {
//   const [isSigned, setIsSigned] = useState<boolean | undefined>();
//   const { setUserState } = useUserMutators();

//   useEffect(() => {
//     return onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUserState(user);
//         setIsSigned(true);
//       } else {
//         setIsSigned(false);
//       }
//     });
//   }, [setUserState]);

//   return isSigned;
// };

export const useIsRegisterEmail = (): boolean | undefined => {
  const [isRegisteredEmail, setIsRegisteredEmail] = useState<boolean | undefined>();
  const [, setStatusCode] = useState<number | undefined>();
  const { setUserRole } = useUserRoleMutators();
  const [user] = useAuthState(auth);

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
            console.error(error.message); //Axiosの例外オブジェクトとして扱える
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
