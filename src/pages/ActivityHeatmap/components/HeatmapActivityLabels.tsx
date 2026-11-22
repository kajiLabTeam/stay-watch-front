import { HOUR_END, HOUR_START } from '../utils';
import { ActivityProbability } from '@/pages/ActivityHeatmap/types/activity';

interface HeatmapActivityLabelsProps {
  activities: readonly ActivityProbability[];
}

export default function HeatmapActivityLabels({ activities }: HeatmapActivityLabelsProps) {
  return (
    <div className='flex w-16 shrink-0 flex-col gap-1 md:w-36 md:gap-2'>
      {activities.map((activity) => (
        <div
          key={activity.activity_name}
          className='h-8 truncate text-right text-xs font-medium leading-8 md:h-12 md:text-base md:leading-12'
          title={activity.activity_name}
        >
          {activity.activity_name}
          <span className='sr-only'>
            {activity.probabilities
              .slice(HOUR_START, HOUR_END)
              .map((p, i) => `${HOUR_START + i}時 ${Math.round(p * 100)}%`)
              .join(', ')}
          </span>
        </div>
      ))}
    </div>
  );
}
