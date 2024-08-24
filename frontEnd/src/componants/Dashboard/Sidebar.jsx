import { faCirclePlus, faList, faShop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`fixed z-30 inset-y-0 right-0 w-64 bg-white backdrop-blur-sm border-l border-slate-300 text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
            <div className="flex items-center justify-between px-4 py-4">
                <div className='mx-auto'>
                    <img className='max-w-[70px] md:max-w-[85px] lg:max-w-[95px]'
                        src="../../images/logo-white.png"
                        width={120}
                        height={50}
                        alt="logo"
                    />
                </div>
                <button className="text-white md:hidden" onClick={toggleSidebar}>
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
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <nav className="mt-5 space-y-2">
                <Link to="" className="block py-2.5 px-4 rounded transition duration-200 border border-yellow-500 rounded w-[80%] mx-auto text-slate-800 font-medium text-center hover:bg-yellow-600 hover:text-white"> <FontAwesomeIcon className='ml-3' icon={faCirclePlus} /> اضافة منتج  </Link>
                <Link to="/dashboard/products" className="block py-2.5 px-4 rounded transition duration-200 border border-yellow-500 rounded w-[80%] mx-auto text-slate-800 font-medium text-center hover:bg-yellow-600 hover:text-white"> <FontAwesomeIcon className='ml-3' icon={faShop} /> المنتجات</Link>
                <Link to="" className="block py-2.5 px-4 rounded transition duration-200 border border-yellow-500 rounded w-[80%] mx-auto text-slate-800 font-medium text-center hover:bg-yellow-600 hover:text-white">  <FontAwesomeIcon className='ml-3' icon={faCirclePlus} /> اضافة فئة </Link>
                <Link to="" className="block py-2.5 px-4 rounded transition duration-200 border border-yellow-500 rounded w-[80%] mx-auto text-slate-800 font-medium text-center hover:bg-yellow-600 hover:text-white">  <FontAwesomeIcon className='ml-3' icon={faList} /> فئات </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
