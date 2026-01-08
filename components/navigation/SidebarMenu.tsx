import { LucideMenu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import Logo from "../Logo"

const SidebarMenu = () => {
    return (
        <Sheet>
            {/* Menu Button */}
            <SheetTrigger asChild>
                <LucideMenu />
            </SheetTrigger>
            {/* Sidebar content */}
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        <Logo />
                    </SheetTitle>
                </SheetHeader>
                {/* sidebar links */}
                <nav className="flex flex-col gap-4 mt-8">
                    <a href="#home" className="text-lg hover:underline">Home</a>
                    <a href="#about" className="text-lg hover:underline">About</a>
                    <a href="#projects" className="text-lg hover:underline">Projects</a>
                    <a href="#contact" className="text-lg hover:underline">Contact</a>
                </nav>
            </SheetContent>
        </Sheet >
    )
}

export default SidebarMenu