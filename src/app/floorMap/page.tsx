'use client';
import { Suspense } from 'react';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { FloorMapCanvas } from '@/features/floorMap/FloorMapCanvas';

const FloorMapPage = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>loading...</div>}>
        <FloorMapCanvas />
      </Suspense>
    </ErrorBoundary>
  );
};

export default FloorMapPage;
