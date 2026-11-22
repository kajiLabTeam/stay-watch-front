import { LoadingOverlay } from '@mantine/core';
import { DeleteUserModal } from './DeleteUserModal';
import { EditUserFormActions } from './EditUserFormActions';
import { UserFormFields } from './UserFormFields';
import { useUserForm } from '../../hooks/useUserForm';
import { UserFormValues } from '../../types/userForm';
import { RequestErrorAlert } from '@/components/common/RequestErrorAlert';
import { ApiError, request } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAlertModeMutators } from '@/atoms/alertModeAtom';
import { useEditingUserMutators } from '@/atoms/editingUserAtom';
import { useUserState } from '@/atoms/firebaseUserAtom';
import { useCommunityState } from '@/atoms/communityAtom';
import { useDeleteModal } from '@/hooks/useDeleteModal';
import { BeaconType } from '@/types/beacon';
import { UpdateUserRequest } from '@/types/request';
import { UserEditor } from '@/types/user';
import { ENDPOINTS } from '@/utils/endpoint';

export const EditUserForm = (props: { user: UserEditor; beaconTypes: BeaconType[] }) => {
  const { user, beaconTypes } = props;
  const firebaseUser = useUserState();
  const community = useCommunityState();
  const currentTagNames = user.tags.map((tag) => tag.name);
  const { opened, open, close } = useDeleteModal();
  const queryClient = useQueryClient();
  const { setEditingUserId } = useEditingUserMutators();
  const { setAlertMode } = useAlertModeMutators();

  const displayAlert = (alertMode: number) => {
    setAlertMode(alertMode);
    setTimeout(() => {
      setAlertMode(-1);
    }, 5000);
  };

  const {
    isPending: loadingUpdateUser,
    error: errorUpdateUser,
    mutate: updateUser,
  } = useMutation<void, ApiError, UserFormValues>({
    mutationFn: async (values: UserFormValues) => {
      if (!firebaseUser) return;

      let updateUserRequest: UpdateUserRequest = {
        id: user.id,
        name: values.name,
        uuid: values.uuid,
        email: values.email,
        role: parseInt(values.role),
        communityId: community.communityId,
        beaconName: values.beaconName,
        tagNames: values.tagNames,
      };
      const token = await firebaseUser.getIdToken();
      await request(ENDPOINTS.users, { method: 'PUT', token, body: updateUserRequest });
      queryClient.invalidateQueries({
        queryKey: [`${ENDPOINTS.adminUsers}/${community.communityId}`],
      });
      setEditingUserId(-1);
      displayAlert(2);
    },
  });

  const {
    isPending: loadingDeleteUser,
    error: errorDeleteUser,
    mutate: deleteUser,
  } = useMutation<void, ApiError, number>({
    mutationFn: async (userId: number) => {
      if (!firebaseUser) return;

      const token = await firebaseUser.getIdToken();
      await request(`${ENDPOINTS.users}/${userId}`, { method: 'DELETE', token });
      // これより下は成功した時のみ動作する
      queryClient.invalidateQueries({
        queryKey: [`${ENDPOINTS.adminUsers}/${community.communityId}`],
      });
      setEditingUserId(-1);
      displayAlert(3);
    },
  });

  const form = useUserForm({
    name: user.name,
    uuid: user.uuid.slice(-5),
    email: user.email,
    role: user.role.toString(),
    communityId: 0,
    beaconName: user.beaconName,
    tagNames: currentTagNames,
  });

  return (
    <div>
      {(loadingDeleteUser || loadingUpdateUser) && (
        <LoadingOverlay visible overlayProps={{ blur: 3 }} />
      )}
      <DeleteUserModal
        opened={opened}
        hasError={Boolean(errorDeleteUser)}
        onClosed={close}
        onDeleteConfirmed={() => deleteUser(user.id)}
      />
      <div className='rounded-lg bg-slate-200 px-10 pb-4'>
        <h1 className='pt-2 text-left text-2xl text-slate-800'>{user.name}</h1>
        <form
          className=' flex flex-col'
          onSubmit={form.onSubmit((values) => {
            const modifiedValues = { ...values, communityId: community.communityId };
            updateUser(modifiedValues);
          })}
        >
          <UserFormFields form={form} beaconTypes={beaconTypes} />
          <EditUserFormActions onCancelled={() => setEditingUserId(-1)} onDeleteClicked={open} />
          <RequestErrorAlert
            error={errorUpdateUser}
            conflictMessage='このメールアドレスは既に登録されています'
          />
        </form>
      </div>
    </div>
  );
};
