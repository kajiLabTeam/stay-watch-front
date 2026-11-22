import { createFileRoute } from '@tanstack/react-router';
import { FloorMapCanvas } from '@/features/floorMap/components/FloorMapCanvas';

export const Route = createFileRoute('/floorMap')({
  component: FloorMapCanvas,
});
