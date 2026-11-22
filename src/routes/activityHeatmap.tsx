import { createFileRoute } from '@tanstack/react-router';
import ActivityHeatmap from '@/features/activityHeatmap/components/ActivityHeatmap';

export const Route = createFileRoute('/activityHeatmap')({
  component: ActivityHeatmap,
});
