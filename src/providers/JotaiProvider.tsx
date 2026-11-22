import { Provider } from 'jotai';
import { FC, ReactNode, memo } from 'react';

type Props = {
  children: ReactNode;
};

export const JotaiProvider: FC<Props> = memo((props) => {
  const { children } = props;

  return <Provider>{children}</Provider>;
});

JotaiProvider.displayName = 'JotaiProvider';
