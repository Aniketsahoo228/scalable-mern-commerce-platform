import { Link, NavLink, useNavigate } from "react-router-dom";
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

  const handelLogout = () => {
    navigate("/");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600&display=swap');

        .as-root {
          font-family: 'Inter', sans-serif;
          background: #0d1117;
          min-height: 100vh;
          width: 240px;
          padding: 32px 20px;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
        }

        .as-brand {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px;
          font-weight: 600;
          color: #fff;
          text-decoration: none;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 4px;
        }

        .as-brand-sub {
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          margin-bottom: 36px;
          display: block;
        }

        .as-nav-label {
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          margin-bottom: 10px;
          padding-left: 12px;
        }

        .as-nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: all 0.2s ease;
          margin-bottom: 2px;
          border: 1px solid transparent;
        }

        .as-nav-link:hover {
          color: rgba(255,255,255,0.85);
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.06);
        }

        .as-nav-link.active {
          color: #fff;
          background: rgba(99,102,241,0.15);
          border-color: rgba(99,102,241,0.3);
        }

        .as-nav-link.active svg {
          color: #818cf8;
        }

        .as-nav-link svg {
          font-size: 13px;
          flex-shrink: 0;
          color: rgba(255,255,255,0.25);
          transition: color 0.2s ease;
        }

        .as-nav-link:hover svg {
          color: rgba(255,255,255,0.6);
        }

        .as-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 20px 0;
        }

        .as-logout-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 10px 12px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 6px;
          color: rgba(252,165,165,0.8);
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: auto;
        }

        .as-logout-btn:hover {
          background: rgba(239,68,68,0.15);
          border-color: rgba(239,68,68,0.4);
          color: #fca5a5;
        }
      `}</style>

      <div className="as-root">

        {/* Brand */}
        <Link to="/admin" className="as-brand">Azurelle</Link>
        <span className="as-brand-sub">Admin Console</span>

        {/* Nav */}
        <p className="as-nav-label">Navigation</p>
        <nav style={{ display: "flex", flexDirection: "column" }}>
          <NavLink
            to="/admin/home"
            className={({ isActive }) => `as-nav-link${isActive ? " active" : ""}`}
          >
            <FaChartLine />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) => `as-nav-link${isActive ? " active" : ""}`}
          >
            <FaUser />
            <span>Users</span>
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) => `as-nav-link${isActive ? " active" : ""}`}
          >
            <FaBoxOpen />
            <span>Products</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) => `as-nav-link${isActive ? " active" : ""}`}
          >
            <FaClipboardList />
            <span>Orders</span>
          </NavLink>

          <div className="as-divider" />

          <NavLink
            to="/"
            end
            className={({ isActive }) => `as-nav-link${isActive ? " active" : ""}`}
          >
            <FaStore />
            <span>Back to Shop</span>
          </NavLink>
        </nav>

        {/* Logout */}
        <button onClick={handelLogout} className="as-logout-btn">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </div>
    </>
  );
};

export default AdminSidebar;
