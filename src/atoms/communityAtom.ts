import { atom, useAtomValue, useSetAtom } from 'jotai';

const community = atom({
  communityId: -1,
  communityName: '',
});

export const useCommunityState = () => {
  return useAtomValue(community);
};

export const useCommunityMutators = () => {
  const setCommunity = useSetAtom(community);

  return {
    setCommunity,
  };
};
