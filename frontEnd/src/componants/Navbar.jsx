import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faCartArrowDown, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { emptyCard } from '../Utils/cardSlice';

export default function Navbar({state, setState}) {

    const [sticky, setSticky] = useState(false);
    const card = useSelector((state) => state.card.products)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleStickyNavbar = () => {
        if (window.scrollY >= 80) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleStickyNavbar);
    });

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.setItem("isAuth", false);
        localStorage.setItem("isAdmin", false);
        dispatch(emptyCard());
        navigate('/');
    }


    return (

        <nav className={`w-full md:static md:text-sm !bg-white ${state && '!bg-opacity-90' } shadow-sticky backdrop-blur-sm ${sticky
            ? "!fixed !z-[9999] !bg-white !bg-opacity-100 md:!bg-opacity-60 shadow-sticky backdrop-blur-sm !transition border"
            : "!bg-opacity-30 md:!bg-opacity-10"
            }`}>
            <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between py-3 md:py-2 md:block">
                    <Link to="/">
                        <img className='max-w-[70px] md:max-w-[85px] lg:max-w-[95px]'
                            src="../../images/logo-white.png"
                            width={120}
                            height={50}
                            alt="logo"
                        />
                    </Link>
                    <div className="md:hidden">
                        <button className="text-gray-500 hover:text-gray-800"
                            onClick={() => setState(!state)}
                            id='dropdownMenuIconButton'
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 h-screen md:h-auto ${state ? 'block' : 'hidden'}`}>
                    <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                        <li className="text-gray-700 hover:text-indigo-600 pl-2">
                            <Link to="/shop" className="w-[50%] mx-auto md:w-auto block py-3 text-center text-gray-700 hover:text-indigo-600 border rounded-lg md:border-none">
                                صفحة المنتجات
                            </Link>
                        </li>
                        <span className='hidden w-px h-6 bg-gray-300 md:block'></span>
                        <div className='space-y-3 items-center gap-x-6 md:flex md:space-y-0'>
                            <li>
                                {(localStorage.getItem("isAuth") === 'true') ? (
                                    <>
                                        <button onClick={logout} className="w-[50%] mx-auto md:w-auto block py-3 text-center text-gray-700 hover:text-indigo-600 border rounded-lg md:border-none">
                                            تسجيل الخروج
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" className="w-[50%] mx-auto md:w-auto block py-3 text-center text-gray-700 hover:text-indigo-600 border rounded-lg md:border-none">
                                            تسجيل الدخول
                                        </Link>
                                    </>
                                )}

                            </li>
                            {
                                (localStorage.getItem("isAdmin") === 'true') ? (
                                    <>
                                        <li>
                                            <Link to="/dashboard/products">
                                                <button className="w-[50%] md:w-auto mx-auto block py-4 px-4 font-medium text-center text-white bg-yellow-600 hover:bg-yellow-500 active:bg-yellow-700 active:shadow-none rounded-lg shadow">
                                                    لوحة التحكم <FontAwesomeIcon className='mr-2' icon={faClipboard} />
                                                </button>
                                            </Link>
                                        </li>
                                    </>
                                ) : (null)
                            }
                            <li className='relative'>
                                <Link to="/card" className="w-[50%] mx-auto block py-3 px-4 font-medium text-center text-white bg-yellow-600 hover:bg-yellow-500 active:bg-yellow-700 active:shadow-none rounded-lg shadow md:inline">
                                    السلة <FontAwesomeIcon className='mr-2' icon={faBagShopping} />
                                </Link>
                                <div className='absolute bottom-5 right-[70px] px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full'>
                                    {card.length}
                                </div>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>

    )
}