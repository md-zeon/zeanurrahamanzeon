import DigitalClock from "../DigitalClock"
import Logo from "../Logo"
import NavLinks from "./NavLinks"

const Navbar = () => {
    return (
        <nav className="flex items-center px-6 py-6 border rounded">
            <Logo />
            <NavLinks />
            <DigitalClock />
        </nav>
    )
}

export default Navbar