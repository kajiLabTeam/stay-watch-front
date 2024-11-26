'use client';

import BeaconBase from '@/features/beacon/BeaconBase';

const BeaconPage = ({ params }: { params: { privateKey: string } }) => {
  return <BeaconBase privateKey={params.privateKey} />;
};

export default BeaconPage;
