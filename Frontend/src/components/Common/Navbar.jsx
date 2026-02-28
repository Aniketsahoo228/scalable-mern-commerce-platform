import { Link } from "react-router-dom";
import { HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useState } from "react";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

   const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen)
   }  

    const toggleCartDrawer = () => {
     setDrawerOpen(!drawerOpen)
    };
  return (
    <>
    <nav className = "container mx-auto flex items-center justify-between py-4 px-6">
            <div>
                <Link to = "/" className = "text-2xl font-medium">
                AURELLE
                </Link>
            </div>
            <div className ="hidden md:flex space-x-6">
                  <Link to="#" className = "text-gray-700 hover:text-black text-sm font-medium uppercase">
                  Men
                  </Link>
                  <Link to="#" className = "text-gray-700 hover:text-black text-sm font-medium uppercase">
                  Women
                  </Link>
                  <Link to="#" className = "text-gray-700 hover:text-black text-sm font-medium uppercase">
                  Top Wear
                  </Link>
                  <Link to="#" className = "text-gray-700 hover:text-black text-sm font-medium uppercase">
                  Bottom Wear
                  </Link>
            </div>  
            <div className="flex items-center space-x-4">
              <Link to="/profile" className = "hover:text-black">
              <HiOutlineUser />
              </Link>
              <button onClick={toggleCartDrawer} 
              className="relative py-2 px-2 rounded-full text-white font-semibold tracking-wide bg-gradient-to-r from-indigo-500 via-purple-600 via-orange-500 to-yellow-400 bg-[length:300%_300%] bg-left shadow-lg shadow-purple-500/20 hover:bg-right hover:scale-105 hover:shadow-purple-500/40 transition-all duration-700 ease-out group">
                <HiOutlineShoppingBag />
                <span className="absolute -top-1 -right-1 bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  4
                </span>
              </button>
            <div className ="overflow-hidden">
              <SearchBar />

            </div>

              <button onClick={toggleNavDrawer} className = "md:hidden"> 
                <HiBars3BottomRight className = "h-6 w-6 text-gray-700" />
              </button>
            </div>  
    </nav>
    <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer}/>
   
    <div
      className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full 
      bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        navDrawerOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </>
    
  )
}

export default Navbar
