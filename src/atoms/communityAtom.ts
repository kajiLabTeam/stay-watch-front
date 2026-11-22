import { atom, useAtomValue } from 'jotai';
import { verifiedUserState } from '@/atoms/verifiedUserAtom';

interface Community {
  readonly communityId: number;
  readonly communityName: string;
}

// 権限確認(check)の結果がない間は null
const communityState = atom((get): Community | null => {
  const verifiedUser = get(verifiedUserState);
  if (verifiedUser === null) return null;

  return { communityId: verifiedUser.communityId, communityName: verifiedUser.communityName };
});

export const useCommunityState = (): Community | null => {
  return useAtomValue(communityState);
};
