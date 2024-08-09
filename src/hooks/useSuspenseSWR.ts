import useSWR from 'swr';

export const useSuspenseSWR = <T>(url: string) => {
  const fetcher = async (url: string): Promise<any> => {
    const resonse = await fetch(url);
    const data = resonse.json();
    return data;
  };

  const { data, error } = useSWR<T>(url, fetcher, { suspense: true });
  // if(data == undefined){
  //   return {error}
  // }
  return { data: data ?? ({} as T), error };
};
