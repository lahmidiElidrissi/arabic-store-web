import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function Dashboard() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex h-screen bg-gray-200">
            <div className="flex-1 flex flex-col " style={{ overflow: 'scroll' }}>
                <header className="p-4 bg-white shadow-md flex justify-between items-center md:hidden">
                    <img className='max-w-[70px] md:max-w-[85px] lg:max-w-[95px]'
                        src="../../images/logo-white.png"
                        width={120}
                        height={50}
                        alt="logo"
                    />
                    <button className="text-gray-500 focus:outline-none" onClick={toggleSidebar}>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </header>
                <Outlet />
            </div>
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        </div>
    );
}

export default Dashboard;
