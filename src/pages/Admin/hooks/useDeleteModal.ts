import { useReducer } from 'react';

type Action = 'open' | 'close';

const reducer = (_state: boolean, action: Action) => action === 'open';

export const useDeleteModal = () => {
  const [opened, dispatch] = useReducer(reducer, false);
  return {
    opened,
    open: () => dispatch('open'),
    close: () => dispatch('close'),
  };
};
