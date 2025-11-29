import DigitalClock from "../DigitalClock"
import Logo from "../Logo"
import NavLinks from "./NavLinks"

const Navbar = () => {
    return (
        <nav id="navbar" className={`font-roboto-mono fixed top-0 left-0 right-0 z-50 bg-[#0A090E] flex justify-between items-center px-6 py-4.5 border rounded`}>
            <Logo />
            <NavLinks />
            <DigitalClock />
        </nav>
    )
}

export default Navbar