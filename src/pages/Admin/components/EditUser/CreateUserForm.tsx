import { Button, LoadingOverlay } from '@mantine/core';
import UserFormFields from './UserFormFields';
import { useUserForm } from '../../hooks/useUserForm';
import { UserFormValues } from '../../types/userForm';
import RequestErrorAlert from '@/components/common/RequestErrorAlert';
import { ApiError, request } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAlertModeMutators } from '@/atoms/alertModeAtom';
import { useUserState } from '@/atoms/firebaseUserAtom';
import { useCommunityState } from '@/atoms/communityAtom';
import { BeaconType } from '@/pages/Admin/types/beacon';
import { CreateUserRequest } from '@/types/request';
import { ENDPOINTS } from '@/utils/endpoint';

export default function CreateUserForm(props: { beaconTypes: BeaconType[] }) {
  const { beaconTypes } = props;
  const user = useUserState();
  const community = useCommunityState();
  const { setAlertMode } = useAlertModeMutators();
  const displayAlert = (alertMode: number) => {
    setAlertMode(alertMode);
    setTimeout(() => {
      setAlertMode(-1);
    }, 3000);
  };
  const queryClient = useQueryClient();

  const {
    isPending: loading,
    error,
    mutate: submitCreateUser,
  } = useMutation<void, ApiError, UserFormValues>({
    mutationFn: async (values: UserFormValues) => {
      if (!user || !community) return;

      let createUserRequest: CreateUserRequest = {
        name: values.name,
        uuid: values.uuid,
        email: values.email,
        role: parseInt(values.role),
        communityId: community.communityId,
        beaconName: values.beaconName,
        tagNames: values.tagNames,
      };
      const token = await user.getIdToken();
      await request(ENDPOINTS.users, { method: 'POST', token, body: createUserRequest });
      // これより下は成功した時のみ動作する
      queryClient.invalidateQueries({
        queryKey: [`${ENDPOINTS.adminUsers}/${community.communityId}`],
      });
      displayAlert(1);
      form.reset();
    },
  });

  const form = useUserForm({
    name: '',
    uuid: '',
    email: '',
    role: '1',
    communityId: 0,
    beaconName: '',
    tagNames: [],
  });

  return (
    <div>
      {loading && <LoadingOverlay visible overlayProps={{ blur: 3 }} />}
      <div className='rounded-lg bg-slate-200'>
        <h1 className='pt-4 text-center text-3xl font-bold text-slate-800'>新規登録</h1>
        <form
          className='flex flex-col px-10 py-4'
          onSubmit={form.onSubmit((values) => {
            submitCreateUser(values);
          })}
        >
          <UserFormFields form={form} beaconTypes={beaconTypes} />
          <div className='pt-3'>
            <Button type='submit' className='bg-staywatch-accent' color='#1e5266'>
              登録する
            </Button>
          </div>

          <RequestErrorAlert
            error={error}
            conflictMessage='このメールアドレスは既に登録されています'
          />
        </form>
      </div>
    </div>
  );
}
