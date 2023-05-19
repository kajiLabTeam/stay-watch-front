import { NextPage } from 'next';
import { Suspense } from 'react';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { FloorMap } from '@/features/floorMap/FloorMap';

const FloorMapPage: NextPage = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>loading...</div>}>
        <FloorMap />
      </Suspense>
    </ErrorBoundary>
  );
};

export default FloorMapPage;
