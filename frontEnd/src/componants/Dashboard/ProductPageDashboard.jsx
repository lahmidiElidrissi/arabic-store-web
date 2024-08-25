import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosHttpClient from '../../Utils/api';
import ImageDropZone from './ImageDropZone';

export default function SingleProduct() {

    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const handleImageUpdate = () => {
        console.log('Image updated successfully');
    };

    useEffect(() => {
        const url = import.meta.env.VITE_URL_BACKEND + '/products/' + id;
        axiosHttpClient.get(url).then(response => {
            const { id, name, images, description, price } = response.data; 
            setProduct({ id, name, images, description, price });
        });
    }, []);

    return (
        <div className="flex-1 py-5 md:p-6 md:pr-64 bg-slate-100">
            <div className='mx-5'>
                <h2 class="text-3xl font-bold !leading-tight text-black sm:text-4xl md:text-[45px] md:p-5 text-center"> تحديث المنتج </h2>
                <hr />
                <div className='flex flex-col items-center space-y-5 mt-5'>
                    <label className='text-xl'> اسم المنتج : </label>
                    <input className='bg-white w-[90%] md:w-1/2 border border-slate-300 rounded-md py-2 pl-9 pr-3' type="text" value={product?.name} />
                    <label className='text-xl'> الوصف :</label>
                    <textarea className='bg-white w-[90%] md:w-1/2 border border-slate-300 rounded-md py-2 pl-9 pr-3' defaultValue={product?.description} rows="4" />
                    <label className='text-xl'> السعر :</label>
                    <input className='bg-white w-[90%] md:w-auto border border-slate-300 rounded-md py-2 pl-9 pr-3' type="number" value={product?.price} />
                    <ImageDropZone productId={id} onImageUpdate={handleImageUpdate} ProductImages={product?.images} />
                    <button className='text-xl bg-yellow-500 p-2 rounded'> تحديث </button>
                </div>
            </div>
        </div>
    )
}
