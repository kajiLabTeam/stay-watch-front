'use client';
import { ReactNode } from 'react';
import Foot from '@/components/layout/Footer';
import Head from '@/components/layout/Header';
import { useWindowSize } from '@/hooks/useWindowSize';

const Layout = ({ children }: { children?: ReactNode }) => {
  const { width } = useWindowSize();

  if (!width) {
    return <></>;
  }

  // デスクトップの場合
  if (width > 853) {
    return (
      <div>
        <Head />
        <main className='mx-auto w-11/12 pb-20 md:w-4/5 md:pb-2'>{children}</main>
      </div>
    );
  }
  // モバイルの場合
  return (
    <div>
      <Foot />
      <main className='mx-auto w-11/12 pb-20 md:w-4/5 md:pb-2'>{children}</main>
    </div>
  );
};

export default Layout;
