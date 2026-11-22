import { useQuery } from '@tanstack/react-query';
import { useUserState } from '@/atoms/firebaseUserAtom';
import { fetchApi } from '@/utils/api';

// url が null の間はリクエストを送らない（他のデータの取得完了を待つ場合に使う）
export const useGetAPI = <T>(url: string | null) => {
  const user = useUserState();

  const { data, error, isLoading } = useQuery<T>({
    queryKey: [url],
    enabled: url !== null && user !== null,
    retry: false,
    queryFn: () => {
      if (url === null) throw new Error('URL is not ready');
      return fetchApi<T>(url);
    },
  });

  return { data, error, isLoading };
};
