import { createFileRoute } from '@tanstack/react-router';
import ActivityHeatmap from '@/pages/ActivityHeatmap';

export const Route = createFileRoute('/activityHeatmap')({
  component: ActivityHeatmap,
});
