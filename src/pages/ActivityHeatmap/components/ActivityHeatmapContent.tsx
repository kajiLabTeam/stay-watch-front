import { HeatmapChart } from './HeatmapChart';
import { ActivityProbability } from '@/types/activity';

interface ActivityHeatmapContentProps {
  activities: readonly ActivityProbability[];
}

export function ActivityHeatmapContent({ activities }: ActivityHeatmapContentProps) {
  return (
    <div className='mx-auto px-1 py-3 md:p-6'>
      <h1 className='mb-4 text-lg font-bold md:mb-6 md:text-2xl'>活動予報ヒートマップ</h1>
      <HeatmapChart activities={activities} />
    </div>
  );
}
