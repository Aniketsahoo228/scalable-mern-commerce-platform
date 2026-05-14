import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import {
  FaBoxOpen,
  FaChartLine,
  FaClipboardList,
  FaSignOutAlt,
  FaStore,
  FaUser,
} from "react-icons/fa";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handelLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen w-[240px] flex-col border-r border-white/5 bg-[#0d1117] px-5 py-8 font-['Inter']">

      {/* Brand */}
      <Link
        to="/admin"
        className="mb-1 font-['Space_Grotesk'] text-[20px] font-semibold tracking-[0.05em] text-white"
      >
        Azurelle
      </Link>

      <span className="mb-9 text-[9px] uppercase tracking-[0.3em] text-white/20">
        Admin Console
      </span>

      {/* Navigation Label */}
      <p className="mb-2.5 pl-3 text-[9px] uppercase tracking-[0.25em] text-white/20">
        Navigation
      </p>

      {/* Navigation */}
      <nav className="flex flex-col">

        {/* Dashboard */}
        <NavLink
          to="/admin/home"
          className={({ isActive }) =>
            `mb-1 flex items-center gap-3 rounded-md border px-3 py-2.5 text-[12px] font-medium tracking-[0.05em] transition-all duration-200 ${
              isActive
                ? "border-indigo-500/30 bg-indigo-500/15 text-white"
                : "border-transparent text-white/40 hover:border-white/10 hover:bg-white/5 hover:text-white/85"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <FaChartLine
                className={`text-[13px] transition-all duration-200 ${
                  isActive
                    ? "text-indigo-400"
                    : "text-white/25"
                }`}
              />

              <span>Dashboard</span>
            </>
          )}
        </NavLink>

        {/* Users */}
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `mb-1 flex items-center gap-3 rounded-md border px-3 py-2.5 text-[12px] font-medium tracking-[0.05em] transition-all duration-200 ${
              isActive
                ? "border-indigo-500/30 bg-indigo-500/15 text-white"
                : "border-transparent text-white/40 hover:border-white/10 hover:bg-white/5 hover:text-white/85"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <FaUser
                className={`text-[13px] transition-all duration-200 ${
                  isActive
                    ? "text-indigo-400"
                    : "text-white/25"
                }`}
              />

              <span>Users</span>
            </>
          )}
        </NavLink>

        {/* Products */}
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `mb-1 flex items-center gap-3 rounded-md border px-3 py-2.5 text-[12px] font-medium tracking-[0.05em] transition-all duration-200 ${
              isActive
                ? "border-indigo-500/30 bg-indigo-500/15 text-white"
                : "border-transparent text-white/40 hover:border-white/10 hover:bg-white/5 hover:text-white/85"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <FaBoxOpen
                className={`text-[13px] transition-all duration-200 ${
                  isActive
                    ? "text-indigo-400"
                    : "text-white/25"
                }`}
              />

              <span>Products</span>
            </>
          )}
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `mb-1 flex items-center gap-3 rounded-md border px-3 py-2.5 text-[12px] font-medium tracking-[0.05em] transition-all duration-200 ${
              isActive
                ? "border-indigo-500/30 bg-indigo-500/15 text-white"
                : "border-transparent text-white/40 hover:border-white/10 hover:bg-white/5 hover:text-white/85"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <FaClipboardList
                className={`text-[13px] transition-all duration-200 ${
                  isActive
                    ? "text-indigo-400"
                    : "text-white/25"
                }`}
              />

              <span>Orders</span>
            </>
          )}
        </NavLink>

        {/* Divider */}
        <div className="my-5 h-px bg-white/5" />

        {/* Back To Shop */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `mb-1 flex items-center gap-3 rounded-md border px-3 py-2.5 text-[12px] font-medium tracking-[0.05em] transition-all duration-200 ${
              isActive
                ? "border-indigo-500/30 bg-indigo-500/15 text-white"
                : "border-transparent text-white/40 hover:border-white/10 hover:bg-white/5 hover:text-white/85"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <FaStore
                className={`text-[13px] transition-all duration-200 ${
                  isActive
                    ? "text-indigo-400"
                    : "text-white/25"
                }`}
              />

              <span>Back to Shop</span>
            </>
          )}
        </NavLink>

      </nav>

      {/* Logout */}
      <button
        onClick={handelLogout}
        className="mt-auto flex w-full items-center justify-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-red-300 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/15 hover:text-red-200"
      >
        <FaSignOutAlt />

        <span>Logout</span>
      </button>

    </div>
  );
};

export default AdminSidebar;