import { RegisterdUsers } from "@/components/admin/user/RegisterdUsers";
import { useUserRole } from "@/utils/Auth";

const AdminUserIndex = () => {
  const userRole = useUserRole();
  if (userRole == null || userRole % 2 !== 0) {
    return <div>管理者権限がありません</div>;
  }
  return (
    <RegisterdUsers />
  );
};

export default AdminUserIndex;
