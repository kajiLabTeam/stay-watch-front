import { Tabs } from "@mantine/core";
import { BLERegisteredForm } from "@/components/admin/BLERegisteredForm";
import { BLEUnRegisteredForm } from "@/components/admin/BLEUnRegisteredForm";
import { useUserRole } from "@/utils/Auth";

export const Admin = () => {
  const userRole = useUserRole();

  if (userRole == null || userRole % 2 !== 0) {
    return <div>管理者権限がありません</div>;
  }

  return (
    <div className=" flex h-screen justify-center">
      <div className="w-7/12 ">
        <div className="my-2 text-center text-3xl font-bold">
          メンバーの招待
        </div>
        <div className=" border border-black" />
        <div className="mt-10 rounded-lg bg-slate-200">
          <Tabs defaultValue="outline">
            <Tabs.List>
              <Tabs.Tab value="gallery" className="w-6/12">
                BLEビーコン登録済み
              </Tabs.Tab>
              <Tabs.Tab value="messages" className="w-6/12">
                BLEビーコン未登録
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="gallery" pt="xs">
              <BLERegisteredForm />
            </Tabs.Panel>
            <Tabs.Panel value="messages" pt="xs">
              <BLEUnRegisteredForm />
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
