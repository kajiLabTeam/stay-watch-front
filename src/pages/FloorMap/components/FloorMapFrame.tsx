import { ReactNode } from 'react';

interface FloorMapFrameProps {
  children: ReactNode;
}

export default function FloorMapFrame({ children }: FloorMapFrameProps) {
  return <div className='mb-80 mt-3 border'>{children}</div>;
}
