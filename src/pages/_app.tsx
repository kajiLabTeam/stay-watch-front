import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { FC, ReactNode } from "react";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import NotLogin from "@/components/common/NotLogin";
import Layout from "@/components/layout/Layout";
import { useIsRegisterEmail, useIsSigned } from "@/utils/Auth";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Props = {
  children: ReactNode;
};

const AuthToken: FC<Props> = ({ children }) => {
  const isSigned = useIsSigned();

  if (isSigned === undefined) {
    return <></>;
  }

  return isSigned ? <>{children}</> : <NotLogin />;
};

const AuthEmail: FC<Props> = ({ children }) => {
  const isRegisteredEmail = useIsRegisterEmail();
  if (isRegisteredEmail === undefined) {
    return <></>;
  }
  return isRegisteredEmail ? (
    <div>{children}</div>
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
