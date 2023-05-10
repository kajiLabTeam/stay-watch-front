import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { User } from '@/types/user';
import { endpoints } from '@/utils/api';

type selectUser = {
  value: number;
  label: string;
};

export const useSelectUsers = () => {
  const community = useCommunityState();
  const { data: users } = useSWR<User[]>(`${endpoints.users}/${community.communityId}`);
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
