import { ReactNode } from "react";
import Header from "./Header";

const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <div>
      <Header />
      <main className="pb-20 mx-auto  w-11/12 md:pb-2 md:w-4/5">
        {children}
      </main>
    </div>
  );
};

export default Layout;
