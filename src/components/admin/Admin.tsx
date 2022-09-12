import { Tabs } from "@mantine/core";

import { BLERegisteredForm } from "@/components/admin/BleRegisteredForm";
import { BleUnRegisteredForm } from "@/components/admin/BleUnRegisteredForm";
import { useUserRole } from "@/utils/Auth";

export const Admin = () => {
  const userRole = useUserRole();

  if (userRole == null || userRole % 2 !== 0) {
    return <div>管理者権限がありません</div>;
  }

  return (
    <div className=" flex h-screen justify-center">
      <div className="w-1/2 ">
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
              <BleUnRegisteredForm />
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
