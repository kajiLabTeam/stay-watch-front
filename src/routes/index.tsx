import { createFileRoute } from '@tanstack/react-router';
import Stayer from '@/features/stayer/Stayer';

export const Route = createFileRoute('/')({
  component: Stayer,
});
