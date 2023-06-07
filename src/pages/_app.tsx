import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { RecoilRoot } from 'recoil';
import { SWRConfig } from 'swr';
import Layout from '@/components/layout/Layout';
import AuthEmail from '@/features/Auth/AuthEmail';
import AuthToken from '@/features/Auth/AuthToken';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <Layout>
          <AuthToken>
            <AuthEmail>
              <Component {...pageProps} />
            </AuthEmail>
          </AuthToken>
        </Layout>
      </SWRConfig>
    </RecoilRoot>
  );
}

export default MyApp;
