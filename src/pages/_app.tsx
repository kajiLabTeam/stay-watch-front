import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import Layout from "@/components/common/Layout";
import "../styles/globals.css";
import NotLogin from "@/components/common/NotLogin";
import { useAuth, useAuthEmail } from "@/utils/Auth";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Props = {
  children: JSX.Element;
};

const AuthToken = ({ children }: Props): JSX.Element => {
  const isLoading = useAuth();
  return isLoading ? <NotLogin /> : children;
};

const AuhtEmail = ({ children }: Props): JSX.Element => {
  const isRegisteredEmail = useAuthEmail();
  console.log(isRegisteredEmail);

  return isRegisteredEmail ? (
    children
  ) : (
    <div>管理者にメールアドレスを登録してもらう必要があります</div>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SWRConfig value={{ fetcher }}>
        <Layout>
          <AuthToken>
            <AuhtEmail>
              <Component {...pageProps} />
            </AuhtEmail>
          </AuthToken>
        </Layout>
      </SWRConfig>
    </RecoilRoot>
  );
}

export default MyApp;
