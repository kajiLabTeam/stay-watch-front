import { BeaconCreateFormValues } from '../types/beaconCreateForm';
import { privacyBeaconUserSchema } from '../validation/userSchema';
import { useZodForm } from '@/hooks/useZodForm';

export const useBeaconCreateForm = (initialValues: BeaconCreateFormValues) => {
  return useZodForm(initialValues, privacyBeaconUserSchema);
};

export type BeaconCreateForm = ReturnType<typeof useBeaconCreateForm>;
