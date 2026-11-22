import HeatmapActivityLabels from './HeatmapActivityLabels';
import HeatmapGradientColumn from './HeatmapGradientColumn';
import HeatmapLegend from './HeatmapLegend';
import HeatmapTimeHeader from './HeatmapTimeHeader';
import { ActivityProbability } from '@/pages/ActivityHeatmap/types/activity';

interface HeatmapChartProps {
  activities: readonly ActivityProbability[];
}

export default function HeatmapChart({ activities }: HeatmapChartProps) {
  return (
    <div className='rounded-lg bg-white px-2 py-3 shadow md:p-6'>
      <HeatmapTimeHeader />
      <div className='mt-2 flex gap-1 md:mt-3 md:gap-4'>
        <HeatmapActivityLabels activities={activities} />
        <HeatmapGradientColumn activities={activities} />
      </div>
      <HeatmapLegend />
    </div>
  );
}
