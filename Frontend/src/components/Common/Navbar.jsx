import { Link } from "react-router-dom";
import { HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useState } from "react";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount = cart?.products?.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600&display=swap');
        .nav-brand { font-family: 'Cormorant Garamond', serif; }
        .nav-links { font-family: 'Montserrat', sans-serif; }
        .nav-logo {
          display: block;
          height: 38px;
          width: auto;
          max-width: none;
        }
        .nav-logo-mobile {
          display: block;
          height: 32px;
          width: auto;
          max-width: none;
        }
        .nav-link {
          position: relative;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          color: #555;
          text-transform: uppercase;
          text-decoration: none;
          padding-bottom: 4px;
          transition: color 0.3s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #c9a96e;
          transition: width 0.35s ease;
        }
        .nav-link:hover { color: #1a1a1a; }
        .nav-link:hover::after { width: 100%; }

        .mobile-link {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 400;
          color: #1a1a1a;
          letter-spacing: 0.05em;
          padding: 12px 0;
          border-bottom: 1px solid #f0ece6;
          text-decoration: none;
          transition: color 0.3s ease, padding-left 0.3s ease;
        }
        .mobile-link:hover { color: #c9a96e; padding-left: 8px; }

        .navbar-wrapper {
          border-bottom: 1px solid #f0ece6;
          background: rgba(250, 248, 245, 0.97);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .user-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid #e8e2da;
          color: #555;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .user-icon-btn:hover {
          border-color: #c9a96e;
          color: #c9a96e;
          background: rgba(201,169,110,0.06);
        }
      `}</style>

      <div className="navbar-wrapper">
        <nav className="nav-links container mx-auto flex items-center justify-between py-3 px-6">

          {/* Brand */}
          <Link to="/" aria-label="Azurelle home">
            <img src="/azurelle_nav_logo.svg" alt="Azurelle" className="nav-logo" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { name: "Men", key: "gender" },
              { name: "Women", key: "gender" },
              { name: "Top Wear", key: "category" },
              { name: "Bottom Wear", key: "category" }
            ].map((item) => (
              <Link 
                key={item.name} 
                to={`/collections/all?${item.key}=${encodeURIComponent(item.name)}`} 
                className="nav-link"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-3">

            {/* ✅ Only change — fixed to= and className */}
            
            {user && user.role === "admin" && (<Link to="/admin" className="nav-link">Admin</Link>)}
            <Link to="/profile" className="user-icon-btn">
              <HiOutlineUser className="w-4 h-4" />
            </Link>

            <button
              onClick={toggleCartDrawer}
              className="relative py-2 px-2 rounded-full text-white font-semibold tracking-wide bg-gradient-to-r from-indigo-500 via-purple-600 via-orange-500 to-yellow-400 bg-[length:300%_300%] bg-left shadow-lg shadow-purple-500/20 hover:bg-right hover:scale-105 hover:shadow-purple-500/40 transition-all duration-700 ease-out group"
            >
              <HiOutlineShoppingBag />
              {cartItemCount > 0 && (<span className="absolute -top-1 -right-1 bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5">
                {cartItemCount}
              </span>) }
              
            </button>

            <div className="overflow-hidden">
              <SearchBar />
            </div>

            <button
              onClick={toggleNavDrawer}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-[#e8e2da] text-[#555] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-300"
            >
              <HiBars3BottomRight className="h-5 w-5" />
            </button>

          </div>
        </nav>
      </div>

      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Overlay */}
      {navDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={toggleNavDrawer}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full z-50
        bg-[#faf8f5] shadow-2xl transform transition-transform duration-500 ease-in-out ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#f0ece6]">
          <img src="/azurelle_nav_logo.svg" alt="Azurelle" className="nav-logo-mobile" />
          <button
            onClick={toggleNavDrawer}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-[#e8e2da] text-[#555] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-300"
          >
            <IoMdClose className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-8">
          <p className="text-[9px] font-semibold tracking-[0.3em] text-[#b0a499] uppercase mb-6">Navigation</p>
          <nav>
            {[
              { name: "Men", query: "gender" },
              { name: "Women", query: "gender" },
              { name: "Top Wear", query: "category" },
              { name: "Bottom Wear", query: "category" }
            ].map((item) => (
              <Link 
                key={item.name} 
                // Generates: /collections/all?gender=Men or /collections/all?category=Top%20Wear
                to={`/collections/all?${item.query}=${encodeURIComponent(item.name)}`} 
                onClick={toggleNavDrawer} 
                className="mobile-link"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-8 left-6 right-6">
          <div style={{ height: 1, background: 'linear-gradient(90deg, #c9a96e, transparent)' }} className="mb-4" />
          <p className="text-[10px] tracking-[0.2em] text-[#b0a499] uppercase">Style Redefined</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
