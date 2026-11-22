import { ReactNode } from 'react';
import Foot from '@/components/layout/Footer';
import Head from '@/components/layout/Header';

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <div>
      {/* デスクトップの場合 */}
      <div className='hidden min-[854px]:block'>
        <Head />
      </div>
      {/* モバイルの場合 */}
      <div className='min-[854px]:hidden'>
        <Foot />
      </div>
      <main className='mx-auto w-11/12 pb-20 md:w-4/5 md:pb-2'>{children}</main>
    </div>
  );
}
