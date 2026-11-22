import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import RoomHistory from '@/features/roomHistory/components/RoomHistory';

const searchSchema = z.object({
  page: z.coerce.number().int().positive().optional().catch(undefined),
  'user-id': z.string().optional().catch(undefined),
});

export const Route = createFileRoute('/roomHistory')({
  validateSearch: searchSchema,
  component: RoomHistory,
});
