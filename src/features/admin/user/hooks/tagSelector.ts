import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Tag } from '@/types/tag';
import { endpoints } from '@/utils/api';

type tagSelector = {
  value: number;
  label: string;
};

export const useSelectTags = () => {
  const { data: tags } = useSWR<Tag[]>(`${endpoints.tags}/2`); // コミュニティIDの取得ができ次第修正
  const [tagSelector, setTagSelector] = useState<tagSelector[]>([]);

  useEffect(() => {
    if (tags) {
      const tagList: tagSelector[] = tags.map((tag) => {
        return {
          label: tag.name,
          value: tag.id,
        };
      });
      setTagSelector([...tagList]);
    }
  }, [tags]);

  return tagSelector;
};
