import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axiosHttpClient from '../../Utils/api';
import Toastify from 'toastify-js'

export default function SingleProduct() {

    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        axiosHttpClient.get(import.meta.env.VITE_URL_BACKEND + '/categories/' + id).then(response => {
            const { id, name } = response.data;
            setCategory({ id, name });
        });

    }, []);

    const HandleSubmit = () => {

        axiosHttpClient.put(import.meta.env.VITE_URL_BACKEND + '/categories/' + id , category).then(response => {
            if (response.status === 200) {
                Toastify({
                    text: "تم تحديث المنتج",
                    position: "center",
                    style: {
                        background: "linear-gradient(90deg, rgba(22,200,22,1) 0%, rgba(38,170,3,1) 43%, rgba(36,213,0,1) 100%)",
                        marginTop: "10vh",
                        width: "70%",
                    },
                }).showToast();
            }
        })

    }

    const onDelete = (id) => {
        axiosHttpClient.delete(`${import.meta.env.VITE_URL_BACKEND}/categories/${id}`)
            .then(response => {
                fetchData();
                if (response.status === 200) {
                    Toastify({
                        text: "تم الحذف بنجاح",
                        className: "text-1xl",
                        position: "center",
                        style: {
                            background: "linear-gradient(90deg, rgba(22,200,22,1) 0%, rgba(38,170,3,1) 43%, rgba(36,213,0,1) 100%)",
                            marginTop: "10vh",
                            width: "70%",
                        },
                    }).showToast();
                } else {
                    Toastify({
                        text: "ليس لديك صلاحية الحذف",
                        className: "text-1xl",
                        position: "center",
                        style: {
                            background: "linear-gradient(107.2deg, rgb(150, 15, 15) 10.6%, rgb(247, 0, 0) 91.1%)",
                            marginTop: "10vh",
                            width: "70%",
                        },
                    }).showToast();
                }
            })
            .catch(error => {
                console.error(error);
            });
    };


    return (
        <div className="flex-1 py-5 md:pb-5 md:pt-0 md:pr-64 bg-slate-100">
            <div className='mx-5'>
                <h2 class="text-3xl font-bold !leading-tight text-black sm:text-4xl md:text-[45px] pb-5 md:p-5 text-center md:bg-white w-full"> تحديث الفئة </h2>
                <hr />
                <div className='flex flex-col items-center space-y-5 mt-5 text-center'>
                    <label className='text-xl'> اسم الفئة : </label>
                    <input className='bg-white w-[90%] md:w-auto border border-slate-300 rounded-md py-2 pl-9 pr-3' type="text" value={category?.name}
                        onChange={(e) => setCategory({ ...category, name: e.target.value })} />
                    <div className='flex flex-wrap'>
                        <button className='text-xl mx-2 bg-yellow-500 p-2 rounded text-white' onClick={HandleSubmit}> تحديث </button>
                        <button className='text-xl mx-2 bg-red-500 p-2 rounded text-white' onClick={() => onDelete(category?.id)} > حذف </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
