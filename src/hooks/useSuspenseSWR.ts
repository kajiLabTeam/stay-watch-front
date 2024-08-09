import useSWR from 'swr';

const fetcher = async (url: string) => {
  return await fetch(url).then((res) => res.json());
}

export const useSuspenseSWR = <T>(url: string) => {
  const { data, error, isLoading } = useSWR<T>(url, fetcher);
  return { data: data, error, isLoading };
};
