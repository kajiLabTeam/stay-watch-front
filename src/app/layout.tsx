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

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <RecoilRoot>
//       <SWRConfig
//         value={{
//           fetcher,
//         }}
//       >
//         <Layout>
//           <AuthToken>
//             <AuthEmail>
//               <Component {...pageProps} />
//             </AuthEmail>
//           </AuthToken>
//         </Layout>
//       </SWRConfig>
//     </RecoilRoot>
//   );
// }

// export default MyApp;

// import Document, { Head, Main, NextScript } from 'next/document';

// export default class MyDocument extends Document {
//   render() {
//     return (
//       <html>
//         <Head>
//           <link rel='apple-touch-icon' sizes='180x180' href='apple-touch-icon.png' />
//           <link rel='icon' href='favicon.svg' type='image/svg+xml' />
//           <link rel='icon' type='image/png' sizes='32x32' href='favicon-32x32.png' />
//           <link rel='icon' type='image/png' sizes='16x16' href='favicon-16x16.png' />
//           <link rel='manifest' href='site.webmanifest' />
//           <link rel='mask-icon' href='safari-pinned-tab.svg' color='#5bbad5' />
//           <link
//             href='https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap'
//             rel='stylesheet'
//           />

//           <meta
//             name='description'
//             content='コミュニティにおけるメンバーの滞在情報・履歴の確認ができるサービスです。'
//           />
//         </Head>
//         <body className='font-kosugi'>
//           <Main />
//           <NextScript />
//         </body>
//       </html>
//     );
//   }
// }
