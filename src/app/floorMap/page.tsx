'use client';
import { NextPage } from 'next';
import { Suspense } from 'react';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { FloorMapCanvas } from '@/features/floorMap/FloorMapCanvas';

const FloorMapPage: NextPage = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>loading...</div>}>
        <FloorMapCanvas />
      </Suspense>
    </ErrorBoundary>
  );
};

export default FloorMapPage;
