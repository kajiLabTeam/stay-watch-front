import { atom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { z } from 'zod';
import { userState } from '@/atoms/firebaseUserAtom';

const verifiedUserSchema = z.object({
  uid: z.string(),
  role: z.number(),
  communityId: z.number(),
  communityName: z.string(),
});

export type VerifiedUser = z.infer<typeof verifiedUserSchema>;

const STORAGE_KEY = 'staywatch:verified-user';

const parseVerifiedUser = (text: string | null): VerifiedUser | null => {
  if (text === null) return null;

  try {
    // localStorage の値は外部の値なので、読み込み時に形を検証し、不正なら null に戻す
    const result = verifiedUserSchema.safeParse(JSON.parse(text));
    return result.success ? result.data : null;
  } catch {
    return null;
  }
};

const storage = {
  getItem: (key: string): VerifiedUser | null => parseVerifiedUser(localStorage.getItem(key)),
  setItem: (key: string, value: VerifiedUser | null): void =>
    localStorage.setItem(key, JSON.stringify(value)),
  removeItem: (key: string): void => localStorage.removeItem(key),
};

// 前回の権限確認(check)の結果。次回以降の表示を速くするためのキャッシュで、裏で再取得して更新する
const storedVerifiedUserState = atomWithStorage<VerifiedUser | null>(STORAGE_KEY, null, storage, {
  getOnInit: true,
});

// ログイン中のユーザーと uid が一致するキャッシュだけを有効とする(別アカウントの値を使わない)
export const verifiedUserState = atom((get) => {
  const stored = get(storedVerifiedUserState);
  const user = get(userState);
  return stored !== null && user !== null && stored.uid === user.uid ? stored : null;
});

export const useVerifiedUserState = (): VerifiedUser | null => {
  return useAtomValue(verifiedUserState);
};

export const useVerifiedUserMutators = () => {
  const setVerifiedUser = useSetAtom(storedVerifiedUserState);

  return {
    setVerifiedUser,
    clearVerifiedUser: () => setVerifiedUser(null),
  };
};
