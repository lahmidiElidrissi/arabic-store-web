import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosHttpClient from '../../Utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Toastify from 'toastify-js'

export default function AddProduct() {

    const navigate = useNavigate();
    const categoryName = useRef("");

    const handleSubmitAddCategory = () => {
        if (categoryName.current.value != "") {
            let category = {
                name: categoryName.current.value,
            }
            axiosHttpClient.post(import.meta.env.VITE_URL_BACKEND + '/categories' , category ).then(response => {
                if (response.status === 200) {
                    Toastify({
                        text: "تمت اضافة بنجاح",
                        position: "center",
                        style: {
                            background: "linear-gradient(90deg, rgba(22,200,22,1) 0%, rgba(38,170,3,1) 43%, rgba(36,213,0,1) 100%)",
                            marginTop: "10vh",
                            width: "70%",
                        },
                    }).showToast();
                    navigate('/dashboard/products')
                }
            })
        }
    }

    return (
        <div className="flex-1 py-5 md:pb-5 md:pt-0 md:pr-64 bg-slate-100">
            <div className='mx-5'>
                <h2 class="text-3xl font-bold !leading-tight text-black sm:text-4xl md:text-[45px] pb-5 md:p-5 text-center md:bg-white w-full">  اضافة فئة  </h2>
                <hr />
                <div className='flex flex-col items-center space-y-5 mt-5 text-center'>
                    <label className='text-xl'> اسم الفئة : </label>
                    <input className='bg-white w-[90%] md:w-auto border border-slate-300 rounded-md py-2 pl-9 pr-3' type="text" ref={categoryName} />
                    
                    <div className='flex flex-wrap'>
                        <button className='text-xl mx-2 bg-yellow-500 p-2 rounded text-white' onClick={handleSubmitAddCategory} > <FontAwesomeIcon className='mx-1' icon={faCirclePlus} /> 
                          اضافة الفئة
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
