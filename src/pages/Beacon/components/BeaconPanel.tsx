import { ReactNode } from 'react';

interface BeaconPanelProps {
  children: ReactNode;
}

export function BeaconPanel({ children }: BeaconPanelProps) {
  return (
    <div>
      <div className='mt-5 rounded-lg bg-slate-100 pt-2'>{children}</div>
    </div>
  );
}
