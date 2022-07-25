import { Avatar } from "@mantine/core";
import { useRecoilValue } from "recoil";
import userState from "@/utils/Auth";

export const Profile = () => {
  const user = useRecoilValue(userState);
  return <Avatar src={user?.photoURL} radius="xl" />;
};
