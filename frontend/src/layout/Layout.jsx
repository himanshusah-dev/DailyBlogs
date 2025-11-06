import React from "react";
import Header from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  // Define routes where you DON'T want to show the header
  const hideHeaderRoutes = ["/", "/signIn"];

  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);
  return (
    <div>
      {/* <Header /> */}
      {!shouldHideHeader && <Header />}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
