import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import Layout from "@/components/common/Layout";
import "../styles/globals.css";
import NotLogin from "@/components/common/NotLogin";
import { useAuth } from "@/utils/Auth";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Props = {
  children: JSX.Element;
};

const Auth = ({ children }: Props): JSX.Element => {
  const isLoading = useAuth();
  return isLoading ? <NotLogin /> : children;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SWRConfig value={{ fetcher }}>
        <Layout>
          <Auth>
            <Component {...pageProps} />
          </Auth>
        </Layout>
      </SWRConfig>
    </RecoilRoot>
  );
}

export default MyApp;
