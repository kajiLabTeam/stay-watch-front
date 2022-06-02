import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { SWRConfig } from "swr";
import Layout from "@/components/common/Layout";
import "../styles/globals.css";


const fetcher = (url: string) => fetch(url).then((res) => res.json());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
    </Layout>
  );
}

export default MyApp;
