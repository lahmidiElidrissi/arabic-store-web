import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosHttpClient from '../../Utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import ImageDropZone from './ImageDropZone';
import Toastify from 'toastify-js'

export default function AddProduct() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    let imagesUploaded = [];
    const ProductName = useRef("");
    const ProductPrice = useRef("");
    const ProductCategory = useRef("");
    const ProductDesciption = useRef("");

    useEffect(() => {
        const urlCategories = import.meta.env.VITE_URL_BACKEND + '/categories';
        axiosHttpClient.get(urlCategories).then(response => {
            setCategories(response.data.categories);
        })
    }, []);

    const handleImageUpdate = (images) => {
        imagesUploaded = images
        console.log(imagesUploaded);
    };
    

    const handleSubmitAddProduct = () => {
        if (ProductName.current.value != ""  && ProductPrice.current.value != "") {
            let product = {
                name: ProductName.current.value,
                price: ProductPrice.current.value,
                category_id: ProductCategory.current.value,
                description: ProductDesciption.current.value,
                images: imagesUploaded
            }
            axiosHttpClient.post(import.meta.env.VITE_URL_BACKEND + '/products' , product ).then(response => {
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
                <h2 class="text-3xl font-bold !leading-tight text-black sm:text-4xl md:text-[45px] pb-5 md:p-5 text-center md:bg-white w-full">  اضافة منتج  </h2>
                <hr />
                <div className='flex flex-col items-center space-y-5 mt-5 text-center'>
                    <label className='text-xl'> اسم المنتج : </label>
                    <input className='bg-white w-[90%] md:w-auto border border-slate-300 rounded-md py-2 pl-9 pr-3' type="text" ref={ProductName} />
                    <label className='text-xl'> السعر :</label>
                    <input className='bg-white w-[90%] md:w-auto border border-slate-300 rounded-md py-2 pl-9 pr-3' type="number" ref={ProductPrice} />
                    <label className='text-xl'> الفئة :</label>
                    <select className='bg-white w-[90%] md:w-auto border border-slate-300 rounded-md py-2 pl-9 pr-3' ref={ProductCategory}>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    <label className='text-xl'> الوصف :</label>
                    <textarea className='bg-white w-[90%] md:w-1/2 border border-slate-300 rounded-md py-2 pl-9 pr-3'ref={ProductDesciption} rows="4" />
                        
                        <ImageDropZone productId={null} onImageUpdate={handleImageUpdate} ProductImages={[]} isAddedProduct={true} />
                    
                    <div className='flex flex-wrap'>
                        <button className='text-xl mx-2 bg-yellow-500 p-2 rounded text-white' onClick={handleSubmitAddProduct} > <FontAwesomeIcon icon={faCirclePlus} /> اضافة </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
