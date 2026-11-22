import { Button, LoadingOverlay } from '@mantine/core';
import { BeaconCreateUserFields } from './BeaconCreateUserFields';
import { useBeaconCreateForm } from '../hooks/useBeaconCreateForm';
import { BeaconCreateFormValues } from '../types/beaconCreateForm';
import { RequestErrorAlert } from '@/components/common/RequestErrorAlert';
import { ApiError, request } from '@/utils/api';
import { useMutation } from '@tanstack/react-query';
import { UI_DATA } from '@/constants/uidata';
import { useAlertModeMutators } from '@/atoms/alertModeAtom';
import { useUserState } from '@/atoms/firebaseUserAtom';
import { useCommunityState } from '@/atoms/communityAtom';
import { CreatePrivateBeaconUserRequest } from '@/types/request';
import { ENDPOINTS } from '@/utils/endpoint';

type PropsType = {
  privateKey: string;
};

function BeaconRegisterForm({ privateKey }: PropsType) {
  const community = useCommunityState();
  const firebaseUser = useUserState();
  const { setAlertMode } = useAlertModeMutators();
  const displayAlert = (alertMode: number) => {
    setAlertMode(alertMode);
    setTimeout(() => {
      setAlertMode(-1);
    }, 5000);
  };

  const {
    isPending: loading,
    error,
    mutate: submitCreateUser,
  } = useMutation<void, ApiError, BeaconCreateFormValues>({
    mutationFn: async (values: BeaconCreateFormValues) => {
      if (!firebaseUser) return;

      let createUserRequest: CreatePrivateBeaconUserRequest = {
        name: values.name,
        uuid: '',
        email: values.email,
        role: parseInt(values.role),
        communityId: community.communityId,
        beaconName: UI_DATA.BEACON_NAME_PRIVBEACON,
        tagNames: values.tagNames,
        privateKey: privateKey,
      };
      const token = await firebaseUser.getIdToken();
      await request(ENDPOINTS.users, { method: 'POST', token, body: createUserRequest });
      // これより下は成功した時のみ動作する
      displayAlert(1);
      form.reset();
    },
  });

  const form = useBeaconCreateForm({
    name: '',
    email: '',
    role: '1',
    communityId: 0,
    tagNames: [],
  });

  return (
    <div>
      {loading && <LoadingOverlay visible overlayProps={{ blur: 3 }} />}
      <div>
        <form
          className='flex flex-col px-10 pb-4 pt-2'
          onSubmit={form.onSubmit((values) => {
            submitCreateUser(values);
          })}
        >
          <BeaconCreateUserFields form={form} />
          <div className='pt-3'>
            <Button type='submit' className='bg-staywatch-accent' color='#1e5266'>
              登録する
            </Button>
          </div>

          <RequestErrorAlert error={error} conflictMessage='登録済みのビーコンです' />
        </form>
      </div>
    </div>
  );
}

export default BeaconRegisterForm;
