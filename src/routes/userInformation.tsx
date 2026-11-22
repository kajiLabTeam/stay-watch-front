import { createFileRoute } from '@tanstack/react-router';
import UserInformation from '@/pages/UserInformation';

export const Route = createFileRoute('/userInformation')({
  component: UserInformation,
});
