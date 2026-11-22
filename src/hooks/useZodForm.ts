import { ChangeEvent, SubmitEvent, useState } from 'react';
import { z } from 'zod';

type Errors<T> = Partial<Record<keyof T, string>>;

const isChangeEvent = (v: unknown): v is ChangeEvent<HTMLInputElement> =>
  typeof v === 'object' && v !== null && 'currentTarget' in v;

/**
 * 入力値の保持・zod によるバリデーション・送信処理を行うフォーム用hook
 */
export const useZodForm = <T extends Record<string, unknown>>(
  initialValues: T,
  schema: z.ZodType,
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({});

  const setValue = <K extends keyof T>(name: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // Mantine の入力コンポーネント(TextInput / Select / TagsInput)にそのまま展開できる
  const getInputProps = <K extends keyof T>(name: K) => ({
    value: values[name],
    error: errors[name],
    onChange: (v: unknown) =>
      setValue(name, (isChangeEvent(v) ? v.currentTarget.value : v) as T[K]),
  });

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  const onSubmit = (handler: (values: T) => void) => (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = schema.safeParse(values);
    if (result.success) {
      setErrors({});
      handler(values);
      return;
    }
    const next: Errors<T> = {};
    result.error.issues.forEach((issue) => {
      const key = issue.path[0] as keyof T | undefined;
      if (key !== undefined && next[key] === undefined) {
        next[key] = issue.message;
      }
    });
    setErrors(next);
  };

  return { values, errors, getInputProps, reset, onSubmit };
};
