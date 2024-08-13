import useSWR from 'swr';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { User } from '@/types/user';
import { endpoints } from '@/utils/endpoint';

type selectUser = {
  value: number;
  label: string;
};

const dataToSelectUser = (users: User[]): selectUser[] => {
  return users.map((user) => ({
    label: user.name,
    value: user.id,
  }));
};

export const useSelectUsers = () => {
  const community = useCommunityState();
  const { data: users } = useSWR<User[]>(`${endpoints.users}/${community.communityId}`);
  const selectUsers = users ? dataToSelectUser(users) : [];
  return selectUsers;
};
