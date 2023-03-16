import type { NextPage } from 'next';
import { Suspense } from 'react';
import Stayer from '@/components/stayer/Stayer';

const Home: NextPage = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Stayer />
    </Suspense>
  );
};

export default Home;
