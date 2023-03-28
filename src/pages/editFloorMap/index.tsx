import { Suspense } from 'react';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import EditFloorMap from '@/features/admin/editFloorMap/EditFloorMap';

export const EditFloorMapPages = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>loading...</div>}>
        <EditFloorMap />
      </Suspense>
    </ErrorBoundary>
  );
};

export default EditFloorMapPages;
