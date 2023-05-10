import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

const community = atom({
  key: 'communty',
  default: {
    communityId: -1,
    communityName: '',
  },
});

export const useCommunityState = () => {
  return useRecoilValue(community);
};

export const useCommunityMutators = () => {
  const setCommunity = useSetRecoilState(community);

  return {
    setCommunity,
  };
};
