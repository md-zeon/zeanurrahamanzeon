import { LucideMenu } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import Logo from "../Logo"
import Link from "next/link"

const SidebarMenu = () => {
    return (
        <Sheet>
            {/* Menu Button */}
            <SheetTrigger asChild>
                <LucideMenu />
            </SheetTrigger>
            {/* Sidebar content */}
            <SheetContent className="bg-[#F8FF31] max-w-3xl w-full sidebar-clip">
                <SheetHeader>
                    <SheetTitle>
                        <Logo />
                    </SheetTitle>
                </SheetHeader>
                {/* sidebar links */}
                <nav className="flex flex-col gap-4 pt-12 pl-12 tracking-tighter uppercase text-7xl font-black font-primary">
                    <SheetClose asChild>
                        <Link href="/">Ho<em>m</em>e</Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link href="/about"><em>A</em>bout</Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link href="/projects">Projec<em className="-ml-3 mr-1">t</em>s</Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link href="/contact">Cont<em className="-ml-3 mr-1">a</em>ct</Link>
                    </SheetClose>
                </nav>
            </SheetContent >
        </Sheet >
    )
}

export default SidebarMenu;