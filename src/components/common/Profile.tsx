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
      <Menu
        control={
          <button>
            <Avatar src={user?.photoURL} radius="xl" />
          </button>
        }
        position="bottom"
      >
        {/* Menu items */}
        <Menu.Label>happy663</Menu.Label>
        <Menu.Item>管理者ページ</Menu.Item>
        <Menu.Item>
          <button>出欠登録</button>
        </Menu.Item>
        <Menu.Item>ログアウト</Menu.Item>
      </Menu>
      {showModal && <Confirmation remove={remove} />}
    </>
  );
};
