import React from 'react'

export default function Loader() {
    return (
        <>
            <div class="flex-col gap-4 w-full h-[70vh] flex items-center justify-center">
                <div class="w-28 h-28 border-8 text-yellow-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-yellow-600 rounded-full">
                    <img className='max-w-[50px]  animate-ping'
                            src="../../images/logo-white.png"
                            width={120}
                            height={50}
                            alt="logo"
                        />
                </div>
            </div>
        </>
    )
}
