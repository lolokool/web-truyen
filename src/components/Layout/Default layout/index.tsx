import { ReactNode } from "react";
import HeaderComponent from "./Header/header";
import SideBar from "./sideBar/sideBar";

const ComicLayout = ({
  children,
  pagination,
  scrollToTop,
}: {
  children: ReactNode;
  pagination?: ReactNode;
  scrollToTop?: ReactNode;
}) => (
  <>
    <HeaderComponent />
    <div
      className="abc"
      style={{ display: "flex", margin: "0 45px", color: "#FFF" }}
    >
      <SideBar />
      <div>
        {children}
        <div style={{ paddingLeft: "80px", paddingBottom: 20 }}>
          {pagination}
        </div>
        {scrollToTop}
      </div>
    </div>
  </>
);

export default ComicLayout;
