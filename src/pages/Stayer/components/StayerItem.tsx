import { StayerTags } from './StayerTags';
import { StayerTableType } from '../types/stayer';

interface StayerItemProps {
  stayer: StayerTableType;
}

export function StayerItem({ stayer }: StayerItemProps) {
  return (
    <div className='flex items-center p-0.5 text-sm md:py-2 md:text-2xl'>
      {stayer.name}
      <StayerTags tags={stayer.tags} />
    </div>
  );
}
