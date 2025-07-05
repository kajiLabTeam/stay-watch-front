import useSWR from 'swr';
import { useUserState } from '@/globalStates/firebaseUserState';

export const useGetAPI = <T>(url: string) => {
  const user = useUserState(); // useSWR の外で呼び出す

  // フェッチ関数
  const fetcher = async (url: string) => {
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
  };

  // SWRを使ってデータ取得とキャッシュ
  const { data, error, isLoading } = useSWR<T>(url, fetcher);

  return { data, error, isLoading };
};
