'use client';
import { ReactNode } from 'react';
import { useWindowSize } from 'usehooks-ts';
import Foot from '@/components/layout/Footer';
import Head from '@/components/layout/Header';

const Layout = ({ children }: { children?: ReactNode }) => {
  const { width } = useWindowSize();

  // デスクトップの場合
  if (width > 853) {
    return (
      <div>
        <Head />
        <main className='mx-auto w-11/12  pb-20 md:w-4/5 md:pb-2'>{children}</main>
      </div>
    );
  }

  // モバイルの場合
  return (
    <div>
      <Foot />
      <main className='mx-auto w-11/12  pb-20 md:w-4/5 md:pb-2'>{children}</main>
    </div>
  );

  // return (
  //   <div>
  //     {/* 条件分岐でFooter.tsxを呼ぶように */}
  //     <Head />
  //     <main className="mx-auto w-11/12  pb-20 md:w-4/5 md:pb-2">
  //       {children}
  //     </main>
  //   </div>
  // );
};

export default Layout;
