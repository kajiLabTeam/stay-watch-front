import { useQuery } from '@tanstack/react-query';
import { useUserState } from '@/atoms/firebaseUserAtom';

// url が null の間はリクエストを送らない（他のデータの取得完了を待つ場合に使う）
export const useGetAPI = <T>(url: string | null) => {
  const user = useUserState();

  const { data, error, isLoading } = useQuery<T>({
    queryKey: [url],
    enabled: url !== null,
    retry: false,
    queryFn: async () => {
      if (url === null) throw new Error('URL is not ready');
      if (!user) throw new Error('Not Found User'); // ユーザが存在しない場合エラーを投げる
      const token = await user.getIdToken();

      // 認証トークン付きでリクエストを送信
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('API failed');
      return res.json();
    },
  });

  return { data, error, isLoading };
};
