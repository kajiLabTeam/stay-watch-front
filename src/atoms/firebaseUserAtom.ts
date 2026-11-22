import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { atom, useAtomValue } from 'jotai';
import { app } from '@/utils/firebase';

interface AuthState {
  readonly user: User | null;
  // 最初の認証状態が確定したか
  readonly isResolved: boolean;
}

// 認証状態は Firebase が持つ外部の状態なので、atom がマウントされている間だけ購読する
const authState = atom<AuthState>({ user: null, isResolved: false });
authState.onMount = (setAuthState) => {
  return onAuthStateChanged(getAuth(app), (user) => {
    setAuthState({ user, isResolved: true });
  });
};

export const userState = atom((get) => get(authState).user);

const isSignedState = atom((get) => {
  const { user, isResolved } = get(authState);
  return isResolved ? user !== null : undefined;
});

export const useUserState = (): User | null => {
  return useAtomValue(userState);
};

/** 認証状態が確定するまでは undefined */
export const useIsSignedState = (): boolean | undefined => {
  return useAtomValue(isSignedState);
};
