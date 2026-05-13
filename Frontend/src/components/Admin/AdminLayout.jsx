import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative min-h-screen bg-[#f5f5f7] font-['Inter']">

      {/* Mobile Topbar */}
      <div className="sticky top-0 z-40 flex items-center border-b border-white/10 bg-[#0d1117] px-4 py-4 text-white md:hidden">

        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center rounded-md border border-white/10 bg-white/5 p-2 transition-all duration-200 hover:bg-white/10"
        >
          <FaBars size={18} />
        </button>

        <h1 className="ml-4 font-['Space_Grotesk'] text-lg font-medium tracking-[0.03em]">
          Admin Dashboard
        </h1>

      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[1px] md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-50 h-screen w-64 transform overflow-y-auto transition-transform duration-300 md:translate-x-0 ${
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* Mobile Close Button */}
        <div className="absolute right-4 top-4 md:hidden">
          <button
            onClick={toggleSidebar}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white transition-all duration-200 hover:bg-white/10"
          >
            <FaTimes size={14} />
          </button>
        </div>

        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="min-h-screen md:ml-64">

        <div className="overflow-x-auto p-4 sm:p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default AdminLayout;