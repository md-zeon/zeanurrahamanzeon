import React from 'react'
import Logo from '../Logo'
import Link from 'next/link'
import { LucideLinkedin } from 'lucide-react'
import NavLink from '../navigation/NavLink'

const Footer = () => {
    return (
        <footer className='flex justify-between items-center h-96 text-white max-w-[90%] mx-auto'>
            {/* left border */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="100%" viewBox="0 0 26 734" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                <path d="M1 734C1.00001 458.764 1.00002 304.451 1.00003 29.2154L25 1" stroke="currentColor"></path>
            </svg>
            {/* Content */}
            <div className='flex-1 h-full border-t-2 py-12'>
                <div className='max-w-[1440px] mx-auto'>
                    {/* Footer Header */}
                    <section className='flex justify-between items-center border-b pb-2 relative'>
                        <Logo />
                        <Link href="https://www.linkedin.com/in/zeanur-rahaman-zeon" className="flex items-center gap-1 font-bold hover:underline px-4 pl-6 uppercase" target="_blank w_full"><LucideLinkedin className="inline-block size-4" />/zeanur-rahaman-zeon</Link>
                        <div className='absolute -bottom-0.5 right-0 w-1/4 h-0.5 bg-white'></div>
                    </section>

                    {/* Footer Body */}
                    <section className='py-16 uppercase'>
                        {/* Overview */}
                        <div>
                            <h2 className='text-xl tracking-wide'>O<em>v</em>er<em>v</em>ie<em>w</em></h2>
                            <nav>
                                <ul className='mt-4 flex flex-col gap-2 font-medium text-sm'>
                                    <NavLink title="Home" path="/" isFooterLink />
                                    <NavLink title="About" path="/about" isFooterLink />
                                    <NavLink title="Projects" path="/projects" isFooterLink />
                                    <NavLink title="Contact" path="/contact" isFooterLink />
                                </ul>
                            </nav>
                        </div>
                    </section>
                </div>
            </div >
            {/* right border */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="100%" viewBox="0 0 18 734" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img" >
                <path d="M17.0001 734L17 19.6102L1 1" stroke="currentColor"></path>
            </svg>
        </footer >
    )
}

export default Footer