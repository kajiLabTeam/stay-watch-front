'use client';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import UserInformation from '@/features/userInformation/UserInformation';

const UserInformationIndex = () => {
  return (
    <ErrorBoundary>
      <UserInformation />
    </ErrorBoundary>
  );
};

export default UserInformationIndex;
