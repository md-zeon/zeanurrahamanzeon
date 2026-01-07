import React from 'react'

const Footer = () => {
    return (
        <footer className='flex justify-between items-center h-96 text-white max-w-[90%] mx-auto'>
            {/* left border */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="100%" viewBox="0 0 26 734" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                <path d="M1 734C1.00001 458.764 1.00002 304.451 1.00003 29.2154L25 1" stroke="currentColor"></path>
            </svg>
            {/* Content */}
            <div className='flex-1 h-full border-t-2'>
                <h1>Footer Content</h1>
            </div>
            {/* right border */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="100%" viewBox="0 0 18 734" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                <path d="M17.0001 734L17 19.6102L1 1" stroke="currentColor"></path>
            </svg>
        </footer>
    )
}

export default Footer