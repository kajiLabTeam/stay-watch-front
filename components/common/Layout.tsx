import { ReactNode, VFC } from "react";
import { useWindowSize } from "usehooks-ts";
import Header from "./Header";

const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <div>
      <Header />
      <main className="mx-auto w-11/12 md:w-4/5">{children}</main>
    </div>
  );
};

export default Layout;
