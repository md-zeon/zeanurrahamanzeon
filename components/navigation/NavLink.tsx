import Link from "next/link";
import Scramble from "../animations/Scramble";

interface Props {
    title: string;
    path: string;
}

const NavLink = ({ title, path }: Props) => {

    return (
        <Scramble text={title}>
            <Link href={path} className="py-3 px-4 rounded-sm border border-transparent hover:border-current transition-colors hover:bg-[#44444430] duration-300 ease-in">
                {title}
            </Link>
        </Scramble>
    )
}

export default NavLink;