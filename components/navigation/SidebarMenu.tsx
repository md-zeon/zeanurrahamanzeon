import { LucideMenu } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import Logo from "../Logo"
import RollingLink from "../animations/RollingLink"

const SidebarMenu = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <LucideMenu className="cursor-pointer" />
            </SheetTrigger>

            <SheetContent className="bg-[#F8FF31] max-w-3xl w-full sidebar-clip">
                <SheetHeader>
                    <SheetTitle>
                        <Logo />
                    </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-4 pt-12 pl-12 tracking-tighter uppercase text-7xl font-black font-primary">
                    <SheetClose asChild>
                        <RollingLink href="/">Ho<em>m</em>e</RollingLink>
                    </SheetClose>
                    <SheetClose asChild>
                        <RollingLink href="/about"><em>A</em>bout</RollingLink>
                    </SheetClose>
                    <SheetClose asChild>
                        <RollingLink href="/projects">Projec<em className="-ml-3 mr-1">t</em>s</RollingLink>
                    </SheetClose>
                    <SheetClose asChild>
                        <RollingLink href="/contact">Cont<em className="-ml-3 mr-1">a</em>ct</RollingLink>
                    </SheetClose>
                </nav>
            </SheetContent >
        </Sheet >
    )
}

export default SidebarMenu;