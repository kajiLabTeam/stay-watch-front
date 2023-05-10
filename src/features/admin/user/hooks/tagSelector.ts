import useSWR from 'swr';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { Tag } from '@/types/tag';
import { endpoints } from '@/utils/api';
type tagSelector = {
  value: number;
  label: string;
};

const dataToSelectTag = (tags: Tag[]): tagSelector[] => {
  return tags.map((tag) => ({
    label: tag.name,
    value: tag.id,
  }));
};

export const useSelectTags = () => {
  const community = useCommunityState();
  const { data: tags } = useSWR<Tag[]>(`${endpoints.users}/${community.communityId}`);
  const selectTags = tags ? dataToSelectTag(tags) : [];
  return selectTags;
};
