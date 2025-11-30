import NAV_LINKS from "@/constants/navlinks"
import NavLink from "./NavLink"

const NavLinks = () => {
    return (
        <nav className="text-sm md:flex md:gap-1 lg:gap-2 items-center uppercase hidden mx-auto">
            {NAV_LINKS.map((link) => {
                return (
                    <NavLink key={link.title} title={link.title} path={link.path} />
                )
            })}
        </nav>
    )
}

export default NavLinks