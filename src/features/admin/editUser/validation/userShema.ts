import { z } from 'zod';

const baseSchema = {
  name: z
    .string()
    .min(1, { message: '12文字以内で入力してください' })
    .max(12, { message: '12文字以内で入力してください' }),
  uuid: z
    .string()
    .regex(new RegExp('^[0-9a-f]*$'), { message: '0〜9とa〜fで入力してください' })
    .min(5, { message: '5文字で入力してください' })
    .max(5, { message: '5文字で入力してください' }),
  email: z
    .string()
    .regex(new RegExp('^$|@gmail.com$'), { message: '〜@gmail.comの形式で入力してください' }),
  role: z.string(),
  communityId: z.number(),
  beaconName: z.string().min(1, { message: '必須項目です' }),
  tagNames: z.array(z.string()).min(1, { message: '少なくとも1つは選択してください' }),
}

export const userSchema = z.discriminatedUnion("beaconName", [
  // PrivBeaconの場合
  z.object({
    ...baseSchema,
    beaconName: z.literal("StayWatchBeacon")
  }),

  // それ以外
  z.object({
    ...baseSchema,
    beaconName: z.literal("FCS1301"),
    uuid: z
      .string()
      .regex(new RegExp('^[0-9a-f]*$'), { message: '0〜9とa〜fで入力してください' })
      .length(5, { message: "5文字で入力してください" }),
  })
])

;

// export const userSchema = z
//   .object({
//     name: z
//       .string()
//       .min(1, { message: '12文字以内で入力してください' })
//       .max(12, { message: '12文字以内で入力してください' }),
//     uuid: z
//       .string()
//       .regex(new RegExp('^[0-9a-f]*$'), { message: '0〜9とa〜fで入力してください' })
//       .min(5, { message: '5文字で入力してください' })
//       .max(5, { message: '5文字で入力してください' }),
//     email: z
//       .string()
//       .regex(new RegExp('^$|@gmail.com$'), { message: '〜@gmail.comの形式で入力してください' }),
//     // .email({ message: '有効なメールアドレスを入力してください' })
//     // .min(1, { message: '必須項目です' }),
//     role: z.string(),
//     communityId: z.number(),
//     beaconName: z.string().min(1, { message: '必須項目です' }),
//     tagNames: z.array(z.string()).min(1, { message: '少なくとも1つは選択してください' }),
//   })
//   .superRefine((data, ctx) => {
//     // PrivBeacon以外の時だけUUIDを検証
//     if(data.beaconName !== "PrivBeacon"){
//       if(!data.uuid )
//     }
//   })
// ;

export type CreateInputType = z.infer<typeof userSchema>;
