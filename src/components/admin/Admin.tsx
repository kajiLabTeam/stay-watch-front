import { Tabs } from "@mantine/core";
import { RegisteredForm } from "@/components/admin/RegisteredForm";
import { UnRegisteredForm } from "@/components/admin/UnRegisteredForm";

export const Admin = () => {
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
              <RegisteredForm />
            </Tabs.Panel>
            <Tabs.Panel value="messages" pt="xs">
              <UnRegisteredForm />
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
