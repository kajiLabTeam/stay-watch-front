import axios, { AxiosResponse } from "axios";
import firebase, {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { baseURL } from "./api";
import { app } from "@/utils/firebase";

type UserState = firebase.User | null;

export const userState = atom<UserState>({
  key: "userState",
  default: null,
  dangerouslyAllowMutability: true,
});
export default userState;

export const userRole = atom<number | null>({
  key: "userRole",
  default: null,
  dangerouslyAllowMutability: true,
});

export const login = (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  return signInWithRedirect(auth, provider);
};

export const logout = (): Promise<void> => {
  const auth = getAuth(app);
  return signOut(auth);
};

export const useAuth = (): boolean => {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const auth = getAuth(app);
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      }
    });
  }, [setUser]);

  return isLoading;
};

export const useUser = (): UserState => {
  return useRecoilValue(userState);
};

export const useUserRole = (): number | null => {
  return useRecoilValue(userRole);
};

export const useAuthEmail = (): boolean => {
  const [isRegisteredEmail, setIsRegisteredEmail] = useState(false);
  const setUserRole = useSetRecoilState(userRole);
  const user = useUser();

  useEffect(() => {
    if (user) {
      const checkRegisterdEmail = async () => {
        try {
          const token = await user.getIdToken();
          const resRole: AxiosResponse<number> = await axios.get(
            `${baseURL}/user/v1/check`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setIsRegisteredEmail(true);
          setUserRole(resRole.data);
        } catch (error) {
          setIsRegisteredEmail(false);
        }
      };

      checkRegisterdEmail();
    }
  }, [user]);

  return isRegisteredEmail;
};
