import DigitalClock from "../DigitalClock"
import NavLinks from "./NavLinks"

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center px-6 py-6 border rounded">
            <h1 className="text-2xl">Zeanur Rahaman</h1>
            <NavLinks />
            <DigitalClock />
        </nav>
    )
}

export default Navbar