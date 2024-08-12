'use client';
import { useRouter } from 'next/navigation';
import ErrorBoundary from '@/components/common/ErrorBoundary';

const Home = () => {
  const router = useRouter();
  router.push('/stayer');
  router.refresh();

  return (
    <ErrorBoundary>
      <div />
    </ErrorBoundary>
  );
};

export default Home;
