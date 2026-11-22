import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  UserCredential,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
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
