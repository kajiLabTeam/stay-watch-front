import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode, memo } from 'react';

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export const QueryProvider: FC<Props> = memo((props) => {
  const { children } = props;

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
});

QueryProvider.displayName = 'QueryProvider';
