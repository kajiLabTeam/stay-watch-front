import { getRouteApi, useNavigate } from '@tanstack/react-router';

const route = getRouteApi('/roomHistory');

export const useParamChange = (): [
  number,
  number,
  string | null,
  () => void,
  () => void,
  (userId: string | null) => void, // eslint-disable-line
] => {
  const search = route.useSearch();
  const navigate = useNavigate({ from: '/roomHistory' });
  const currentPage = search.page ?? 1;
  const currentUserID = search['user-id'] ?? null;

  const limit = 30;

  const updatePage = (page: number) => {
    navigate({ search: (prev) => ({ ...prev, page }), resetScroll: false });
  };

  const updateSelectedUser = (userID: string | null) => {
    navigate({
      search: (prev) => ({ ...prev, 'user-id': userID ?? undefined, page: undefined }),
      resetScroll: false,
    });
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
