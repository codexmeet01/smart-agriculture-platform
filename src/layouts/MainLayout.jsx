import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/common/Navbar";
import { Sidebar } from "../components/common/Sidebar";
import { MobileNav } from "../components/common/MobileNav";
import { Toast } from "../components/common/Toast";

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#031A14] text-[#F1F5F9] digital-grid transition-colors duration-300">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <MobileNav />
      <Toast />
    </div>
  );
};
