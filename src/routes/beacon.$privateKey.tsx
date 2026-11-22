import { createFileRoute } from '@tanstack/react-router';
import BeaconBase from '@/pages/Beacon';

export const Route = createFileRoute('/beacon/$privateKey')({
  component: BeaconPage,
});

function BeaconPage() {
  const { privateKey } = Route.useParams();
  return <BeaconBase privateKey={privateKey} />;
}
