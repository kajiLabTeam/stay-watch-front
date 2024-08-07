"use client"
import { NextPage } from 'next';
import { Suspense } from 'react';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import RoomHistory from '@/features/roomHistory/RoomHistory';

const RoomHistoryPage: NextPage = () => {
  // const { fallback } = props;
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>loading...</div>}>
        <RoomHistory />
      </Suspense>
    </ErrorBoundary>
  );
};
export default RoomHistoryPage;
