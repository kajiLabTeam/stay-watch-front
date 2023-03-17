import type { NextPage } from 'next';
import { Suspense } from 'react';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import Stayer from '@/components/stayer/Stayer';

const Home: NextPage = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>loading...</div>}>
        <Stayer />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Home;
