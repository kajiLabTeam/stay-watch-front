import { useCommunityState } from '@/atoms/communityAtom';
import { useGetAPI } from '@/hooks/useGetAPI';
import { Tag } from '@/types/tag';
import { ENDPOINTS } from '@/utils/endpoint';

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
  const { data: tags } = useGetAPI<Tag[]>(
    community ? `${ENDPOINTS.tags}/${community.communityId}` : null,
  );
  const selectTags = tags ? dataToSelectTag(tags) : [];
  return selectTags;
};
