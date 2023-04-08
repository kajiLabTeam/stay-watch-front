import axios, { AxiosResponse } from "axios";
import firebase, {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { endpoints } from "./api";
import { userState } from "@/globalStates/atoms/firebaseUserAtom";
import { userRole } from "@/globalStates/atoms/userRoleAtom";
import { User } from "@/types/user";
import { app } from "@/utils/firebase";

export const login = (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  return signInWithRedirect(auth, provider);
};

export const logout = (): Promise<void> => {
  const auth = getAuth(app);
  return signOut(auth);
};

export const useUser = (): firebase.User | null => {
  return useRecoilValue(userState);
};

export const useUserRole = (): number | null => {
  return useRecoilValue(userRole);
};

export const useIsSigned = (): boolean | undefined => {
  const [isSigned, setIsSigned] = useState<boolean | undefined>();
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const auth = getAuth(app);
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsSigned(true);
      } else {
        setIsSigned(false);
      }
    });
  }, [setUser]);

  return isSigned;
};

export const useIsRegisterEmail = (): boolean | undefined => {
  const [isRegisteredEmail, setIsRegisteredEmail] = useState<
    boolean | undefined
  >();
  const [statusCode, setStatusCode] = useState<number | undefined>();
  const setUserRole = useSetRecoilState(userRole);
  const user = useUser();

  useEffect(() => {
    if (user) {
      const checkRegisterdEmail = async () => {
        try {
          const token = await user.getIdToken();
          const resUser: AxiosResponse<User> = await axios.get(
            endpoints.check,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
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
