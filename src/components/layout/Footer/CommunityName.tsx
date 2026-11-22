import { useCommunityState } from '@/atoms/communityAtom';

export default function FooterCommunityName(): React.JSX.Element {
  const community = useCommunityState();

  return <p className='mr-8 text-right text-xl text-gray-400'>{community.communityName}</p>;
}
