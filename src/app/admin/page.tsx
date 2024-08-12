'use client';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { Admin } from '@/features/admin/components/Admin';

const AdminPage = () => {
  return (
    <ErrorBoundary>
      <Admin />
    </ErrorBoundary>
  );
};

export default AdminPage;
