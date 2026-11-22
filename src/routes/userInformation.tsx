import { createFileRoute } from '@tanstack/react-router';
import UserInformation from '@/features/userInformation/UserInformation';

export const Route = createFileRoute('/userInformation')({
  component: UserInformation,
});
