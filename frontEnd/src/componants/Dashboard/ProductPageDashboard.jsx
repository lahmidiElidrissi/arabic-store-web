import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import axiosHttpClient from '../../Utils/api';
import ImageDropZone from './ImageDropZone';
import Toastify from 'toastify-js'

export default function SingleProduct() {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const selectOptionCategory = useRef([]);
    const navigate = useNavigate();
    const { setIsOpen } = useOutletContext();

    const handleImageUpdate = () => {
        console.log('Image updated successfully');
    };

    useEffect(() => {
        const url = import.meta.env.VITE_URL_BACKEND + '/products/' + id;
        axiosHttpClient.get(url).then(response => {
            const { id, name, images, description, price } = response.data;
            const category_id = response.data.category?.id;
            setProduct({ id, name, images, description, price, category_id });
        });
        const urlCategories = import.meta.env.VITE_URL_BACKEND + '/categories';
        axiosHttpClient.get(urlCategories).then(response => {
            setCategories(response.data.categories);
        })

        setIsOpen(false);
        const elementMenu = document.querySelectorAll('.menu a');
        if (elementMenu.length > 0) {
            elementMenu.forEach(element => {                
                element.addEventListener('click', () => {
                setIsOpen(false);
                });
            });
        }

    }, []);

    // select the current category
    useEffect(() => {
        const selectCategories = selectOptionCategory.current.children;
        for (let index = 0; index < selectCategories.length; index++) {
            const element = selectCategories[index];
            if (element.value == product.category_id) {
                element.selected = true;
            }
        }
    }, [categories]);

    const HandleSubmit = () => {

        const url = import.meta.env.VITE_URL_BACKEND + '/products/' + id;

        axiosHttpClient.put(url, product).then(response => {
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
        axiosHttpClient.delete(`${import.meta.env.VITE_URL_BACKEND}/remove/product/${id}`)
          .then(response => {
            if ( response.status === 200 ) {
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

              navigate('/dashboard/products');

            }else{
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
                <h2 class="text-3xl font-bold !leading-tight text-black sm:text-4xl md:text-[45px] pb-5 md:p-5 text-center md:bg-white w-full"> تحديث المنتج </h2>
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
                    <ImageDropZone productId={id} onImageUpdate={handleImageUpdate} ProductImages={product?.images} isAddedProduct={false} />
                    <div className='flex flex-wrap'>
                        <button className='text-xl mx-2 bg-yellow-500 p-2 rounded text-white' onClick={HandleSubmit}> تحديث </button>
                        <button className='text-xl mx-2 bg-red-500 p-2 rounded text-white' onClick={ () => onDelete(product?.id) } > حذف </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
