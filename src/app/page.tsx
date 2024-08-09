'use client';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import ErrorBoundary from '@/components/common/ErrorBoundary';

const Home = () => {
  const router = useRouter();
  router.push('/stayer');
  router.refresh();

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>loading...</div>}>
        <div />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Home;
