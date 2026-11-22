import { getAuth } from 'firebase/auth';
import { FetchError, ofetch } from 'ofetch';
import { app } from '@/utils/firebase';

export class ApiError extends Error {
  status: number;

  constructor(status: number, message = `Request failed with status ${status}`) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
};

/** ログイン中なら Firebase の ID トークンを Authorization ヘッダーに自動付与する ofetch インスタンス */
const apiFetch = ofetch.create({
  retry: 0,
  async onRequest({ options }) {
    const token = await getAuth(app).currentUser?.getIdToken();
    if (!token) return;
    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${token}`);
    options.headers = headers;
  },
});

/** API リクエストの共通入口。2xx 以外は ApiError を投げ、成功時は JSON(なければ undefined)を返す */
export const fetchApi = async <T = unknown>(
  url: string,
  { method = 'GET', body }: RequestOptions = {},
): Promise<T> => {
  try {
    return (await apiFetch<T>(url, { method, body: body as Record<string, unknown> })) as T;
  } catch (error) {
    if (error instanceof FetchError) throw new ApiError(error.statusCode ?? 0, error.message);
    throw error;
  }
};
