import Topbar from "../Layout/Topbar"
import Navbar from "./Navbar"

const Header = () => {
  return (
    <header className="border-b">
      <Topbar/>
      <Navbar />
    </header>
  )
}

export default Header

