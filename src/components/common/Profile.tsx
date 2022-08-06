import { Avatar } from "@mantine/core";
import { Menu } from "@mantine/core";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { Confirmation } from "@/components/common/Confirmation";
import userState from "@/utils/Auth";

export const Profile = () => {
  const user = useRecoilValue(userState);
  const [showModal, setShowModal] = useState(false);

  const remove = () => {
    setShowModal(false);
  };
  return (
    <>
      <Menu position="bottom-end">
        <Menu.Target>
          <button>
            <Avatar src={user?.photoURL} radius="xl" />
          </button>
        </Menu.Target>
        <Menu.Dropdown className="text-sm">
          <Menu.Label>happy663</Menu.Label>
          <Menu.Item>管理者ページ</Menu.Item>
          <Menu.Item>出欠登録</Menu.Item>
          <Menu.Item>ログアウト</Menu.Item>
        </Menu.Dropdown>
      </Menu>
      {showModal && <Confirmation remove={remove} />}
    </>
  );
};
