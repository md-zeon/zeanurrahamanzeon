import Link from "next/link";
import Scramble from "../animations/Scramble";
import { cn } from "@/lib/utils";

interface Props {
    title: string;
    path: string;
    isFooterLink?: boolean;
}

const NavLink = ({ title, path, isFooterLink }: Props) => {

    return (
        <Scramble text={title}>
            <Link href={path} className={cn(isFooterLink ? "py-1" : "py-3 px-4", !isFooterLink && "rounded-sm border border-transparent hover:border-current transition-colors hover:bg-[#44444430] duration-300 ease-in")}>
                {title}
            </Link>
        </Scramble>
    )
}

export default NavLink;