import { Tab } from "@headlessui/react";

function MyTabs() {
  return (
    <Tab.Group>
      <Tab.List>
        <div className="flex">
          <Tab>在室者</Tab>
          <Tab>在室履歴</Tab>
          <Tab>利用者情報</Tab>
        </div>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>Content 1</Tab.Panel>
        <Tab.Panel>Content 2</Tab.Panel>
        <Tab.Panel>Content 3</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}

export default MyTabs;
