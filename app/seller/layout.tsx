"use client";
import React from "react";

import { ReactNode } from "react";
import Navbar from "../../components/seller/Navbar";
import SideBar from "../../components/seller/Sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="flex w-full">
        <SideBar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
