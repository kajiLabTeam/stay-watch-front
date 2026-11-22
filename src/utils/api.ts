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
  token?: string;
  body?: unknown;
};

/** fetch のラッパー。2xx 以外は ApiError を投げ、成功時は JSON(なければ undefined)を返す */
export const request = async <T = unknown>(
  url: string,
  { method = 'GET', token, body }: RequestOptions = {},
): Promise<T> => {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers['Content-Type'] = 'application/json';

  const res = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new ApiError(res.status);

  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
};
