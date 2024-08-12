'use client';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import Stayer from '@/features/stayer/Stayer';

const Home = () => {
  return (
    <ErrorBoundary>
      <Stayer />
    </ErrorBoundary>
  );
};

export default Home;
