import { createFileRoute } from '@tanstack/react-router';
import FloorMap from '@/pages/FloorMap';

export const Route = createFileRoute('/floorMap')({
  component: FloorMap,
});
