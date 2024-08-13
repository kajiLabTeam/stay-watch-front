import '@/app/globals.css';
import 'tailwindcss/tailwind.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Metadata } from 'next';
import React from 'react';
import Layout from '@/components/layout/Layout';
import AuthEmail from '@/features/Auth/AuthEmail';
import AuthSwitcher from '@/features/Auth/AuthSwitcher';
import { RecoilProvider } from '@/features/admin/editUser/globalState/RecoilProvider';
import { SWRProvider } from '@/features/admin/editUser/globalState/SWRProvider';
import { kosugiMaru } from '@/utils/fonts';
import Favicon from '/public/favicon.ico';

export const metadata: Metadata = {
  title: '滞在ウォッチ',
  description: 'コミュニティにおけるメンバーの滞在情報・履歴の確認ができるサービスです。',
  icons: [{ rel: 'icon', url: Favicon.src }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body className={`${kosugiMaru.className}`}>
        <RecoilProvider>
          <MantineProvider>
            <SWRProvider>
              <Layout>
                <AuthSwitcher>
                  <AuthEmail>{children}</AuthEmail>
                </AuthSwitcher>
              </Layout>
            </SWRProvider>
          </MantineProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}