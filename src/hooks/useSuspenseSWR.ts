import useSWR from 'swr';

export const useSuspenseSWR = <T>(url: string) => {
  const fetcher = async (url: string): Promise<any> => {
    const resonse = await fetch(url);
    return resonse.json();
  };

  const { data, error } = useSWR<T>(url, fetcher, { suspense: true });
  return { data, error };
};
