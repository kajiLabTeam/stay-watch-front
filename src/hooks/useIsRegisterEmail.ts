import { useQuery } from '@tanstack/react-query';
import { useCommunityMutators } from '@/atoms/communityAtom';
import { useUserState } from '@/atoms/firebaseUserAtom';
import { useUserEmailMutators, useUserEmailState } from '@/atoms/userEmailAtom';
import { useUserRoleMutators } from '@/atoms/userRoleAtom';
import { User } from '@/types/user';
import { ApiError, request } from '@/utils/api';
import { ENDPOINTS } from '@/utils/endpoint';

export const useIsRegisterEmail = (): {
  isRegisteredEmail: boolean | undefined;
  status: number;
} => {
  const { setUserRole } = useUserRoleMutators();
  const { setCommunity } = useCommunityMutators();
  const user = useUserState();
  const email = useUserEmailState();
  const { setUserEmail } = useUserEmailMutators();

  const { isSuccess, isError, error } = useQuery<User, Error>({
    queryKey: ['checkRegisteredEmail', user?.uid],
    enabled: !email && !!user,
    retry: false,
    queryFn: async () => {
      // enabled により user は存在するが、型上の絞り込みのためチェックする
      if (!user) throw new Error('user is not signed in');
      const token = await user.getIdToken();
      const resUser = await request<User>(ENDPOINTS.check, { token });

      setUserRole(resUser.role);
      setCommunity({
        communityId: resUser.communityId,
        communityName: resUser.communityName,
      });
      setUserEmail(resUser.email);
      return resUser;
    },
  });

  if (email || isSuccess) {
    return { isRegisteredEmail: true, status: 200 };
  }
  if (!isError) {
    return { isRegisteredEmail: undefined, status: 0 };
  }
  if (!(error instanceof ApiError)) {
    return { isRegisteredEmail: false, status: 0 };
  }
  console.error(error.message);
  return { isRegisteredEmail: false, status: error.status };
};
