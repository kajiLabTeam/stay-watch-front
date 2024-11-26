import { z } from 'zod';

export const privacyBeaconEditUserSchema = z.object({
  id: z.string().refine((name) => name !== '-1', {
    message: '必須項目です',
  }),
});

export type CreateInputType = z.infer<typeof privacyBeaconEditUserSchema>;
