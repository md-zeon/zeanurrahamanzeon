interface Props {
    title: string;
    path: string;
    scrambleEffect: (element: HTMLElement) => void;
}

const NavLink = ({ title, path, scrambleEffect }: Props) => {

    const handleHover = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        scrambleEffect(e.currentTarget.firstChild as HTMLElement);
    }

    return (
        <a href={path} onMouseEnter={handleHover} className="py-3 px-4 rounded-sm border border-transparent hover:border-current transition-colors hover:bg-[#44444430] duration-300 ease-in">
            <span>{title}</span>
        </a>
    )
}

export default NavLink;