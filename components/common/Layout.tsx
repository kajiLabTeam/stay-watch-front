import { ReactNode, VFC } from "react";
import Header from "./Header";

const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <div>
      <Header />
      <main className="mx-auto w-4/5">{children}</main>
    </div>
  );
};

export default Layout;
