import { z } from 'zod';

export const schema = z.object({
  name: z
    .string()
    .min(1, { message: '12文字以内で入力してください' })
    .max(1, { message: '12文字以内で入力してください' }),
  uuid: z
    .string()
    .regex(new RegExp('.*[0-9a-f].*'), { message: '0〜9とa〜fで入力してください' })
    .min(5, { message: '5文字で入力してください' })
    .max(5, { message: '5文字で入力してください' }),
  email: z
    .string()
    .email({ message: '有効なメールアドレスを入力してください' })
    .min(1, { message: '必須項目です' }),
  role: z.number(),
  communityId: z.number(),
  beaconName: z.string().min(1, { message: '必須項目です' }),
  tagIds: z.array(z.number()).min(1, { message: '少なくとも1つは選択してください' }),
});

export type CreateInputType = z.infer<typeof schema>;
