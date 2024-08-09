'use client';
import { Suspense } from 'react';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import Stayer from '@/features/stayer/Stayer';

const Home = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>loading...</div>}>
        <Stayer />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Home;
