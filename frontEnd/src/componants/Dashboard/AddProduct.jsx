import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosHttpClient from '../../Utils/api';

export default function AddProduct() {
    const [product, setProduct] = useState(null);
    const selectOptionCategory = useRef([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const urlCategories = import.meta.env.VITE_URL_BACKEND + '/categories';
        axiosHttpClient.get(urlCategories).then(response => {
            setCategories(response.data.categories);
        })
    }, []);

    return (
        <div className="flex-1 py-5 md:pb-5 md:pt-0 md:pr-64 bg-slate-100">
            <div className='mx-5'>
                <h2 class="text-3xl font-bold !leading-tight text-black sm:text-4xl md:text-[45px] pb-5 md:p-5 text-center md:bg-white w-full">  اضافة منتج  </h2>
                <hr />
                <div className='flex flex-col items-center space-y-5 mt-5 text-center'>
                    <label className='text-xl'> اسم المنتج : </label>
                    <input className='bg-white w-[90%] md:w-auto border border-slate-300 rounded-md py-2 pl-9 pr-3' type="text" value={product?.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })} />
                    <label className='text-xl'> السعر :</label>
                    <input className='bg-white w-[90%] md:w-auto border border-slate-300 rounded-md py-2 pl-9 pr-3' type="number" value={product?.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })} />
                    <label className='text-xl'> الفئة :</label>
                    <select className='bg-white w-[90%] md:w-auto border border-slate-300 rounded-md py-2 pl-9 pr-3'
                        onChange={(e) => setProduct({ ...product, category_id: parseInt(e.target.value) })} ref={selectOptionCategory}>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    <label className='text-xl'> الوصف :</label>
                    <textarea className='bg-white w-[90%] md:w-1/2 border border-slate-300 rounded-md py-2 pl-9 pr-3' defaultValue={product?.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })} rows="4" />
                    <div className='flex flex-wrap'>
                        <button className='text-xl mx-2 bg-yellow-500 p-2 rounded text-white' > اضافة </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
