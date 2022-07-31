import { ReactNode } from "react";
import Header from "@/components/common/Header";

const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <div>
      <Header />
      <main className="mx-auto w-11/12  pb-20 md:w-4/5 md:pb-2">
        {children}
      </main>
    </div>
  );
};

export default Layout;
