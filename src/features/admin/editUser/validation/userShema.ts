import { z } from 'zod';

export const userSchema = z.object({
  name: z
    .string()
    .min(1, { message: '12文字以内で入力してください' })
    .max(12, { message: '12文字以内で入力してください' }),
  email: z
    .string()
    .regex(new RegExp('^$|@gmail.com$'), { message: '〜@gmail.comの形式で入力してください' }),
  role: z.string(),
  communityId: z.number(),
  tagNames: z.array(z.string()).min(1, { message: '少なくとも1つは選択してください' }),
});

export type CreateInputType = z.infer<typeof userSchema>;
