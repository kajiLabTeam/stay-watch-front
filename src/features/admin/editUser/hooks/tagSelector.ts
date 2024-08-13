import useSWR from 'swr';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { Tag } from '@/types/tag';
import { endpoints } from '@/utils/endpoint';

type tagSelector = {
  value: string;
  label: string;
};

const dataToSelectTag = (tags: Tag[]): tagSelector[] => {
  return tags.map((tag) => ({
    label: tag.name,
    value: tag.id.toString(),
  }));
};

export const useSelectTags = () => {
  const community = useCommunityState();
  const { data: tags } = useSWR<Tag[]>(`${endpoints.tags}/${community.communityId}`);
  const selectTags = tags ? dataToSelectTag(tags) : [];
  return selectTags;
};
