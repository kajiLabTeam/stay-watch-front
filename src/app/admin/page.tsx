'use client';
import { NextPage } from 'next';
import { Suspense } from 'react';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { Admin } from '@/features/admin/components/Admin';

const AdminPage: NextPage = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>loading...</div>}>
        <Admin />
      </Suspense>
    </ErrorBoundary>
  );
};

export default AdminPage;
