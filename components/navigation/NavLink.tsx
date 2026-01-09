import Link from "next/link";
import Scramble from "../animations/Scramble";
import { cn } from "@/lib/utils";

interface Props {
    title: string;
    path: string;
    isFooterLink?: boolean;
    isExternal?: boolean;
}

const NavLink = ({ title, path, isFooterLink, isExternal }: Props) => {

    return (
        <Scramble text={title}>
            <Link href={path} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined} className={cn(isFooterLink ? "py-1" : "py-3 px-4", !isFooterLink && "rounded-sm border border-transparent hover:border-current transition-colors hover:bg-[#44444430] duration-300 ease-in", "inline")}>
                {title}
            </Link>
        </Scramble>
    )
}

export default NavLink;