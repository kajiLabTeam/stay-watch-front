import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useCurrentPage = (): [number, number, () => void, () => void] => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  const limit = 30;

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`, { scroll: false }); // ページ遷移を防ぐ
  };

  const NextPage = () => {
    updatePage(currentPage + 1);
  };

  const PreviousPage = () => {
    updatePage(currentPage - 1);
  };

  const currentOffset = (currentPage - 1) * limit;

  return [currentOffset, currentPage, PreviousPage, NextPage];
};

export const useHandleUserChange = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pathname = usePathname();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateQueryParams = (params: Record<string, string | undefined>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  return (value: string | null) => {
    updateQueryParams({ 'user-id': value || undefined });
  };
};
