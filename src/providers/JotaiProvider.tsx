import { Provider } from 'jotai';
import { ReactNode } from 'react';

interface JotaiProviderProps {
  children: ReactNode;
}

export default function JotaiProvider({ children }: JotaiProviderProps) {
  return <Provider>{children}</Provider>;
}
