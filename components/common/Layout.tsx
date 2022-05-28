import { ReactNode, VFC } from "react";
import { useWindowSize } from "usehooks-ts";
import Header from "./Header";

const Layout = ({ children }: { children?: ReactNode }) => {
  const { width, height } = useWindowSize();
  console.log(width, height);

  return (
    <div>
      <Header />
      <main className="mx-auto w-11/12 sm:w-4/5">{children}</main>
    </div>
  );
};

export default Layout;
