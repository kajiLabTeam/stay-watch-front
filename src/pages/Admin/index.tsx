import { useState } from 'react';
import { AdminTabs } from '@/pages/Admin/components/AdminTabs';
import { useUserRoleState } from '@/atoms/userRoleAtom';

function Admin() {
  const [activeTab, setActiveTab] = useState<string | null>('first');
  const userRole = useUserRoleState();

  if (userRole === 1) return <div>管理者権限がありません</div>;

  return (
    <>
      <title>管理者ページ</title>
      <AdminTabs activeTab={activeTab} onTabChanged={setActiveTab} />
    </>
  );
}

export default Admin;
