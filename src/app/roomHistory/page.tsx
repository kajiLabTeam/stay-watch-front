'use client';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import RoomHistory from '@/features/roomHistory/RoomHistory';

const RoomHistoryPage = () => {
  // const { fallback } = props;
  return (
    <ErrorBoundary>
      <RoomHistory />
    </ErrorBoundary>
  );
};
export default RoomHistoryPage;
