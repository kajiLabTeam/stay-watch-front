import { useEffect, useState } from "react";
import useSWR from "swr";
import { User } from "@/types/user";
import { baseURL } from "@/utils/api";

type selectUser = {
  value: string;
  label: string;
};

export const useSelectUsers = () => {
  const { data: users, error } = useSWR<User[]>(`${baseURL}/user/v1/list`);
  const [selectUsers, setSelectUsers] = useState<selectUser[]>([]);

  useEffect(() => {
    if (users) {
      const userList: selectUser[] = users.map((user) => {
        return {
          label: user.name,
          value: `${user.id}`,
        };
      });
      setSelectUsers([...userList]);
    }
  }, [users]);

  return selectUsers;
};
