import useSWR from 'swr';
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
  const { data: tags } = useSWR<Tag[]>(`${endpoints.tags}/2`); // コミュニティIDの取得ができ次第修正
  const selectTags = tags ? dataToSelectTag(tags) : [];
  return selectTags;
};
