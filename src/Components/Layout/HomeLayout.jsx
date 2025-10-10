import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";

const HomeLayout = ({ children }) => {
  const pathName = window.location.pathname.includes("/chat");
  return (
    <>
      <div className="site-wrapper">
        {!pathName && <Header />}
        <main className="main-area fix">{children}</main>
        {!pathName && <Footer />}
        <MobileBottomNav />
      </div>
    </>
  );
};

export default HomeLayout;
