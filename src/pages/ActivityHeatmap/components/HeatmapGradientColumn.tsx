import HeatmapCurrentTimeLine from './HeatmapCurrentTimeLine';
import { useCurrentTimePercent } from '../hooks/useCurrentTimePercent';
import { buildGradient } from '../utils';
import { ActivityProbability } from '@/pages/ActivityHeatmap/types/activity';

interface HeatmapGradientColumnProps {
  activities: readonly ActivityProbability[];
}

export default function HeatmapGradientColumn({ activities }: HeatmapGradientColumnProps) {
  const currentTimePercent = useCurrentTimePercent();

  return (
    <div className='relative flex-1'>
      {currentTimePercent !== null && <HeatmapCurrentTimeLine percent={currentTimePercent} />}
      <div className='flex flex-col gap-1 md:gap-2'>
        {activities.map((activity) => (
          <div
            key={activity.activity_name}
            className='h-8 rounded md:h-12'
            style={{ background: buildGradient(activity.probabilities) }}
            aria-hidden='true'
          />
        ))}
      </div>
    </div>
  );
}
