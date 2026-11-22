import { Alert, Button, LoadingOverlay, Select, TagsInput, TextInput } from '@mantine/core';
import { useZodForm } from '@/hooks/useZodForm';
import { ApiError, request } from '@/utils/api';
import { useMutation } from '@tanstack/react-query';
import { roleSelector } from '@/constants/roleSelector';
import { UI_DATA } from '@/constants/uidata';
import { useAlertModeMutators } from '@/atoms/alertModeAtom';
import { useSelectTags } from '@/hooks/tagSelector';
import { privacyBeaconUserSchema } from '@/pages/Beacon/validation/userSchema';
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
  const selectTags = useSelectTags();
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
  } = useMutation<void, ApiError, typeof form.values>({
    mutationFn: async (values: typeof form.values) => {
      if (firebaseUser) {
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
      }
    },
  });

  const form = useZodForm(
    {
      name: '',
      email: '',
      role: '1',
      communityId: 0,
      tagNames: [],
    },
    privacyBeaconUserSchema,
  );

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
          <TextInput placeholder='tarou' label='名前' {...form.getInputProps('name')} />
          <TextInput
            label='Gメールアドレス（任意）'
            placeholder='your@gmail.com'
            {...form.getInputProps('email')}
          />
          <div className='flex space-x-4'>
            <Select
              label='権限'
              className='w-1/2'
              placeholder='権限レベルを選択してください'
              data={roleSelector}
              {...form.getInputProps('role')}
            />
          </div>
          <TagsInput
            label='タグ'
            placeholder='タグを選択してください'
            data={selectTags}
            {...form.getInputProps('tagNames')}
          />
          <div className='pt-3'>
            <Button type='submit' className='bg-staywatch-accent' color='#1e5266'>
              登録する
            </Button>
          </div>

          {error && error.status === 409 && (
            <Alert title='失敗' color='red'>
              登録済みのビーコンです
            </Alert>
          )}
          {error && error.status !== 409 && (
            <Alert title='失敗' color='red'>
              エラーが発生しました
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}

export default BeaconRegisterForm;
