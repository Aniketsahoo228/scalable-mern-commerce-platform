import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen relative bg-[#f5f5f7]">
      <div className="flex md:hidden items-center p-4 bg-gray-900 text-white z-30 sticky top-0">
        <button onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 text-xl font-medium">Admin Dashboard</h1>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-screen bg-gray-900 w-64 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 z-30 overflow-y-auto`}
      >
        <AdminSidebar />
      </div>

      <div className="md:ml-64 min-h-screen">
        <div className="p-6 overflow-x-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
