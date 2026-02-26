import { Link } from "react-router-dom";

const Navbar = () => {
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
    </nav>
    </>
  )
}

export default Navbar
