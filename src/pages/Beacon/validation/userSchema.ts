import { z } from 'zod';

export const privacyBeaconUserSchema = z.object({
  name: z
    .string()
    .min(1, { error: '12文字以内で入力してください' })
    .max(12, { error: '12文字以内で入力してください' }),
  email: z
    .string()
    .regex(new RegExp('^$|@gmail.com$'), { error: '〜@gmail.comの形式で入力してください' }),
  // .email({ error: '有効なメールアドレスを入力してください' })
  // .min(1, { error: '必須項目です' }),
  role: z.string(),
  tagNames: z.array(z.string()).min(1, { error: '少なくとも1つは選択してください' }),
});

export type CreateInputType = z.infer<typeof privacyBeaconUserSchema>;
