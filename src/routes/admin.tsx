import { createFileRoute } from '@tanstack/react-router';
import { Admin } from '@/features/admin/components/Admin';

export const Route = createFileRoute('/admin')({
  component: Admin,
});
