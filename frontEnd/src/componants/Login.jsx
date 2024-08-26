import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosHttpClient from '../Utils/api';
import Toastify from 'toastify-js'
import { emptyCard } from '../Utils/cardSlice';
import { useDispatch } from 'react-redux';
import GoogleAuthButton from './GoogleAuthButton';


export default function login() {

    const email = useRef([]);
    const password = useRef([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = async (e) => {
        e.preventDefault();
        const userEmail = email.current.value;
        const userPassword = password.current.value;
        const response = await axiosHttpClient.post(import.meta.env.VITE_URL_BACKEND_2 + '/login', { "email": userEmail, "password": userPassword });

        if (response.isError === false) {
            Toastify({
                text: "تم تسجيل الدخول بنجاح",
                position: "center",
                style : {
                    background: "linear-gradient(90deg, rgba(22,200,22,1) 0%, rgba(38,170,3,1) 43%, rgba(36,213,0,1) 100%)",
                    marginTop: "10vh",
                    width: "70%",
                },
            }).showToast();
            // redirect to home
            response.data.token && localStorage.setItem("access_token", response.data.token);
            // set isAuth
            localStorage.setItem("isAuth", true)
            // set isAdmin true or false
            localStorage.setItem("isAdmin", response.data.isAdmin)
            // empty card for gets products of current user
            dispatch(emptyCard());
            navigate('/');
        }else{
            Toastify({
                text: "فشل تسجيل الدخول، بريدك الإلكتروني أو كلمة المرور غير صحيحة",
                className: "text-1xl",
                position: "center",
                style : {
                    background: "linear-gradient(107.2deg, rgb(150, 15, 15) 10.6%, rgb(247, 0, 0) 91.1%)",
                    marginTop: "10vh",
                    width: "70%",
                },
            }).showToast();
        }

    }

    return (
        <>
            <div className="border-t border-slate-200 mx-auto max-w-screen-xl min-h-[80vh] px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto py-[15%] md:py-[5%] max-w-lg">
                    <h1 className="text-center text-2xl font-bold text-yellow-600 sm:text-3xl">تسجيل الدخول </h1>

                    <form action="#" className="mb-0 mt-6 border border-slate-200 bg-[#4a6cf708] space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                        <p className="text-center text-lg font-medium">تسجيل الدخول إلى حسابك</p>

                        <div>
                            <label htmlFor="email" className="sr-only">بريد إلكتروني</label>

                            <div className="relative">
                                <input
                                    type="email"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="بريد إلكتروني"
                                    ref={email}
                                />

                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">كلمة المرور</label>

                            <div className="relative">
                                <input
                                    type="password"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="كلمة المرور"
                                    ref={password}
                                />

                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <button
                            className="block w-full rounded-lg bg-yellow-600 px-5 py-3 text-sm font-medium text-white"
                            onClick={login}
                        >
                            تسجيل الدخول
                        </button>

                        <GoogleAuthButton />

                        <p className="text-center text-sm text-gray-500">
                            ليس لديك حساب؟
                            <a className="underline mr-5" href="#">اشتراك</a>
                        </p>
                    </form>
                </div>
                <div className="absolute top-0 right-[-40%] md:right-0 z-[-1] opacity-30 lg:opacity-70">
                    <svg
                        width="350"
                        height="450"
                        viewBox="0 0 450 556"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="277"
                            cy="63"
                            r="225"
                            fill="url(#paint0_linear_25:217)"
                        />
                        <circle
                            cx="17.9997"
                            cy="182"
                            r="18"
                            fill="url(#paint1_radial_25:217)"
                        />
                        <circle
                            cx="76.9997"
                            cy="288"
                            r="34"
                            fill="url(#paint2_radial_25:217)"
                        />
                        <circle
                            cx="325.486"
                            cy="302.87"
                            r="180"
                            transform="rotate(-37.6852 325.486 302.87)"
                            fill="url(#paint3_linear_25:217)"
                        />
                        <circle
                            opacity="0.8"
                            cx="184.521"
                            cy="315.521"
                            r="132.862"
                            transform="rotate(114.874 184.521 315.521)"
                            stroke="url(#paint4_linear_25:217)"
                        />
                        <circle
                            opacity="0.8"
                            cx="356"
                            cy="290"
                            r="179.5"
                            transform="rotate(-30 356 290)"
                            stroke="url(#paint5_linear_25:217)"
                        />
                        <circle
                            opacity="0.8"
                            cx="191.659"
                            cy="302.659"
                            r="133.362"
                            transform="rotate(133.319 191.659 302.659)"
                            fill="url(#paint6_linear_25:217)"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_25:217"
                                x1="-54.5003"
                                y1="-178"
                                x2="222"
                                y2="288"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" />
                                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                            </linearGradient>
                            <radialGradient
                                id="paint1_radial_25:217"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
                            >
                                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
                            </radialGradient>
                            <radialGradient
                                id="paint2_radial_25:217"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
                            >
                                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
                            </radialGradient>
                            <linearGradient
                                id="paint3_linear_25:217"
                                x1="226.775"
                                y1="-66.1548"
                                x2="292.157"
                                y2="351.421"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" />
                                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient
                                id="paint4_linear_25:217"
                                x1="184.521"
                                y1="182.159"
                                x2="184.521"
                                y2="448.882"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" />
                                <stop offset="1" stopColor="white" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient
                                id="paint5_linear_25:217"
                                x1="356"
                                y1="110"
                                x2="356"
                                y2="470"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" />
                                <stop offset="1" stopColor="white" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient
                                id="paint6_linear_25:217"
                                x1="118.524"
                                y1="29.2497"
                                x2="166.965"
                                y2="338.63"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" />
                                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <div className="absolute md:bottom-0 bottom-[70px] md:bottom-[80px] left-0 z-[-1] opacity-70 lg:opacity-70">
                    <svg
                        width="364"
                        height="201"
                        viewBox="0 0 364 201"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
                            stroke="url(#paint0_linear_25:218)"
                        />
                        <path
                            d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
                            stroke="url(#paint1_linear_25:218)"
                        />
                        <path
                            d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
                            stroke="url(#paint2_linear_25:218)"
                        />
                        <path
                            d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
                            stroke="url(#paint3_linear_25:218)"
                        />
                        <circle
                            opacity="0.8"
                            cx="214.505"
                            cy="60.5054"
                            r="49.7205"
                            transform="rotate(-13.421 214.505 60.5054)"
                            stroke="url(#paint4_linear_25:218)"
                        />
                        <circle cx="220" cy="63" r="43" fill="url(#paint5_radial_25:218)" />
                        <defs>
                            <linearGradient
                                id="paint0_linear_25:218"
                                x1="184.389"
                                y1="69.2405"
                                x2="184.389"
                                y2="212.24"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" stopOpacity="0" />
                                <stop offset="1" stopColor="#4A6CF7" />
                            </linearGradient>
                            <linearGradient
                                id="paint1_linear_25:218"
                                x1="156.389"
                                y1="69.2405"
                                x2="156.389"
                                y2="212.24"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" stopOpacity="0" />
                                <stop offset="1" stopColor="#4A6CF7" />
                            </linearGradient>
                            <linearGradient
                                id="paint2_linear_25:218"
                                x1="125.389"
                                y1="69.2405"
                                x2="125.389"
                                y2="212.24"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" stopOpacity="0" />
                                <stop offset="1" stopColor="#4A6CF7" />
                            </linearGradient>
                            <linearGradient
                                id="paint3_linear_25:218"
                                x1="93.8507"
                                y1="67.2674"
                                x2="89.9278"
                                y2="210.214"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" stopOpacity="0" />
                                <stop offset="1" stopColor="#4A6CF7" />
                            </linearGradient>
                            <linearGradient
                                id="paint4_linear_25:218"
                                x1="214.505"
                                y1="10.2849"
                                x2="212.684"
                                y2="99.5816"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" />
                                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                            </linearGradient>
                            <radialGradient
                                id="paint5_radial_25:218"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(220 63) rotate(90) scale(43)"
                            >
                                <stop offset="0.145833" stopColor="white" stopOpacity="0" />
                                <stop offset="1" stopColor="white" stopOpacity="0.08" />
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </>
    )
}
