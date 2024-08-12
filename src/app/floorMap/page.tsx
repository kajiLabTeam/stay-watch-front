'use client';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { FloorMapCanvas } from '@/features/floorMap/FloorMapCanvas';

const FloorMapPage = () => {
  return (
    <ErrorBoundary>
      <FloorMapCanvas />
    </ErrorBoundary>
  );
};

export default FloorMapPage;
