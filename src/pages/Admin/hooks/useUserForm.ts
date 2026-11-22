import { UserFormValues } from '../types/userForm';
import { userSchema } from '../validation/userSchema';
import { useZodForm } from '@/hooks/useZodForm';

export const useUserForm = (initialValues: UserFormValues) => {
  return useZodForm(initialValues, userSchema);
};

export type UserForm = ReturnType<typeof useUserForm>;
