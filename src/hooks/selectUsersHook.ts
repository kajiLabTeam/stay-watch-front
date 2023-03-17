import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { User } from '@/types/user';
import { endpoints } from '@/utils/api';

type selectUser = {
  value: number;
  label: string;
};

export const useSelectUsers = () => {
  const { data: users } = useSWR<User[]>(`${endpoints.users}`);
  const [selectUsers, setSelectUsers] = useState<selectUser[]>([]);

  useEffect(() => {
    if (users) {
      const userList: selectUser[] = users.map((user) => {
        return {
          label: user.name,
          value: user.id,
        };
      });
      setSelectUsers([...userList]);
    }
  }, [users]);

  return selectUsers;
};
