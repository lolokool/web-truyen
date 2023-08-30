import { ReactNode } from "react";

import HeaderComponent from "./Header/header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <HeaderComponent />
      <div>{children}</div>
    </>
  );
};

export default Layout;
