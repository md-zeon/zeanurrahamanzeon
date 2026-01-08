import { LucideLinkedin, LucideMenu } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import Logo from "../Logo"
import RollingLink from "../animations/RollingLink"
import Image from "next/image"
import DigitalClock from "../DigitalClock"
import Link from "next/link"

const SidebarMenu = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <LucideMenu className="cursor-pointer" />
            </SheetTrigger>

            <SheetContent className="flex flex-col justify-between bg-[#F8FF31] max-w-3xl w-full sidebar-clip">
                <SheetHeader>
                    <SheetTitle className="p-4">
                        <Logo />
                    </SheetTitle>
                </SheetHeader>

                <nav className="flex-1 flex flex-col gap-4 pt-12 pl-16 tracking-tighter uppercase text-7xl font-black font-primary">
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
                <div className="pl-8 pr-4">
                    <div className="flex gap-1 items-center justify-between pl-6">
                        <div className="h-0.5 bg-black/80 flex-1" />
                        <Image src="/icons/flower.svg" width={18} height={18} alt="Flower Icon" />
                    </div>
                    <div className="flex justify-between gap-4 items-center font-medium text-lg my-5">
                        <Link href="https://www.linkedin.com/in/zeanur-rahaman-zeon" className="flex items-center gap-1 font-bold hover:underline px-4 pl-6" target="_blank w_full"><LucideLinkedin className="inline-block size-4" />/zeanur-rahaman-zeon</Link>
                        <DigitalClock />
                    </div>
                </div>
            </SheetContent >
        </Sheet >
    )
}

export default SidebarMenu;