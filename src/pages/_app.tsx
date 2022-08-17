import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import NotLogin from "@/components/common/NotLogin";
import Layout from "@/components/layout/Layout";
import "../styles/globals.css";
import { useIsRegisterEmail, useIsSigned } from "@/utils/Auth";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Props = {
  children: JSX.Element;
};

const AuthToken = ({ children }: Props): JSX.Element => {
  const isSigned = useIsSigned();
  return isSigned === undefined ? <></> : isSigned ? children : <NotLogin />;
};

const AuhtEmail = ({ children }: Props): JSX.Element => {
  const isRegisteredEmail = useIsRegisterEmail();

  return isRegisteredEmail === undefined ? (
    <></>
  ) : isRegisteredEmail ? (
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
