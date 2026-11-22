import { Badge } from '@/components/common/Badge';
import { Tag } from '@/types/tag';

interface StayerTagsProps {
  tags: readonly Tag[];
}

export function StayerTags({ tags }: StayerTagsProps) {
  return (
    <div className='flex md:ml-1'>
      {tags.map((tag) => (
        <span key={tag.id} className='ml-1 w-fit'>
          <Badge name={tag.name} />
        </span>
      ))}
    </div>
  );
}
