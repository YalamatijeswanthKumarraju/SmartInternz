// pages/Layout.js
import React from "react";
import NavigationBar from "./Navbar"; // your existing navbar
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <NavigationBar />
      <div className="container mt-4">
        <Outlet /> {/* renders child route */}
      </div>
    </>
  );
};

export default Layout;
