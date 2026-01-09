import React from 'react'
import Logo from '../Logo'
import Link from 'next/link'
import { LucideLinkedin } from 'lucide-react'
import NavLink from '../navigation/NavLink'
import { Separator } from '../ui/separator'
import DigitalClock from '../DigitalClock'

const Footer = () => {
    return (
        <footer className='relative flex justify-between items-center text-white max-w-[90%] mx-auto'>
            {/* left border */}
            <svg className='absolute top-0 -left-5' xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 26 734" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                <path d="M1 734C1.00001 458.764 1.00002 304.451 1.00003 29.2154L25 1" stroke="currentColor"></path>
            </svg>
            {/* Content */}
            <div className='flex-1 h-full border-t border-white/50 py-12'>
                <div className='max-w-[1440px] mx-auto'>
                    {/* Footer Header */}
                    <section className='flex justify-between items-center border-b pb-2 relative'>
                        <Logo />
                        <Link href="https://www.linkedin.com/in/zeanur-rahaman-zeon" className="flex items-center gap-1 font-bold hover:underline px-4 pl-6 uppercase" target="_blank w_full"><LucideLinkedin className="inline-block size-4" />/zeanur-rahaman-zeon</Link>
                        <div className='absolute -bottom-0.5 right-0 w-1/4 h-0.5 bg-white'></div>
                    </section>

                    {/* Footer Body */}
                    <section className='py-16 uppercase grid grid-cols-4 gap-8'>
                        {/* Overview */}
                        <div>
                            <h2 className='text-xl tracking-wide text-white/50'>O<em>v</em>er<em>v</em>ie<em>w</em></h2>
                            <nav>
                                <ul className='mt-4 flex flex-col gap-3 font-medium'>
                                    <li>
                                        <NavLink title="Home" path="/" isFooterLink />
                                    </li>
                                    <li>
                                        <NavLink title="About" path="/about" isFooterLink />
                                    </li>
                                    <li>
                                        <NavLink title="Projects" path="/projects" isFooterLink />
                                    </li>
                                    <li>
                                        <NavLink title="Contact" path="/contact" isFooterLink />
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        {/* Connect */}
                        <div>
                            <h2 className='text-xl tracking-wide text-white/50'>Co<em>nne</em>c<em>t</em></h2>
                            <nav>
                                <ul className='mt-4 flex flex-col gap-3 font-medium'>
                                    <li>
                                        <NavLink title="LinkedIn" path="https://www.linkedin.com/in/zeanur-rahaman-zeon" isFooterLink isExternal />
                                    </li>
                                    <li>
                                        <NavLink title="GitHub" path="https://github.com/md-zeon" isFooterLink isExternal />
                                    </li>
                                    <li>
                                        <NavLink title="Twitter" path="https://twitter.com/developerzeon" isFooterLink isExternal />
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </section>
                    {/* Footer Bottom */}
                    <Separator />
                    <section className='mt-16 pb-3 grid grid-cols-3 gap-4'>
                        <p className='text-start text-white/80 max-sm:col-span-3'>&copy; {new Date().getFullYear()} Zeanur Rahaman Zeon. All rights reserved.</p>
                        <DigitalClock className='text-center text-white/80 max-sm:text-start' />
                        <p className='text-white/80 text-end max-sm:text-end'>
                            <Link href="/privacy-policy" className='hover:underline'>Privacy Policy</Link>
                        </p>
                    </section>
                </div>
            </div >
            {/* right border */}
            <svg className='absolute top-0 -right-3.5 bottom-0' xmlns="http://www.w3.org/2000/svg" width="16px" height="100%" viewBox="0 0 18 734" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img" >
                <path d="M17.0001 734L17 19.6102L1 1" stroke="currentColor"></path>
            </svg>
        </footer >
    )
}

export default Footer