import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export const useParamChange = (): [
  number,
  number,
  string | null,
  () => void,
  () => void,
  (userId: string | null) => void, // eslint-disable-line
] => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const paramUserID = searchParams.get('user-id');
  const currentUserID = paramUserID;

  const limit = 30;

  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`, { scroll: false }); // ページ遷移を防ぐ
    router.refresh();
  };

  const updateSelectedUser = (userID: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (userID) {
      params.set('user-id', userID);
    } else {
      params.delete('user-id');
    }
    params.delete('page');
    router.push(`?${params.toString()}`, { scroll: false }); // ページ遷移を防ぐ
    router.refresh();
  };

  const nextPage = () => {
    updatePage(currentPage + 1);
  };

  const previousPage = () => {
    updatePage(currentPage - 1);
  };

  const currentOffset = (currentPage - 1) * limit;

  return [currentOffset, currentPage, currentUserID, previousPage, nextPage, updateSelectedUser];
};
