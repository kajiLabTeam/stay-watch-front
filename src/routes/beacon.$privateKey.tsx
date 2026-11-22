import { createFileRoute } from '@tanstack/react-router';
import BeaconBase from '@/features/beacon/BeaconBase';

export const Route = createFileRoute('/beacon/$privateKey')({
  component: BeaconPage,
});

function BeaconPage() {
  const { privateKey } = Route.useParams();
  return <BeaconBase privateKey={privateKey} />;
}
