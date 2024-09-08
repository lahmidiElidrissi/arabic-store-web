import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import SingleProduct from './SingleProduct';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { addProductToAPI } from '../Utils/cardSlice';
import Loader from './loader';
import Carousel from '../Utils/Carousel';
import Fancybox from '../Utils/FancyBox';
import { currencyFormatter } from '../Utils/helpers';

export default function ProductPage() {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const url = import.meta.env.VITE_URL_BACKEND + '/product/' + id;
        axios.get(url).then(response => {
            const { id, name, images, description, price } = response.data.product[0];
            setProduct({ id, name, images, description, price });
        });
    }, []);

    const addToCart = (productId) => {
        dispatch(addProductToAPI(productId))
    }

    const orderProduct = (productId) => {
        dispatch(addProductToAPI(productId))
        navigate('/card')
    }

    return (
        <div className='bg-slate-50 border-t mb-[150px] md:mb-0 border-slate-200 pb-[200px] md:pb-0'>
            <div className='container h-[80vh]'>
                {(product) ?
                    <div className='flex flex-wrap items-center h-5/6'>
                        <div className="w-[100%] md:w-[50%]">
                            <div>
                                <Fancybox
                                    // Sample options
                                    options={{
                                        Carousel: {
                                            infinite: false,
                                        },
                                    }}
                                >
                                    <Carousel
                                        options={{ infinite: false }}
                                    >
                                        {
                                            product.images.map((image, index) =>
                                                <div className="f-carousel__slide"
                                                    data-fancybox="gallery"
                                                    data-src={image.path}
                                                    data-thumb-src={image.path}
                                                    key={index}
                                                >
                                                    <img src={image.path} alt="image" className="p-6 md:p-1 w-[300px] md:w-auto mx-auto" />
                                                </div>
                                            )
                                        }
                                    </Carousel>
                                </Fancybox>
                            </div>
                        </div>
                        <div className="w-[100%] md:w-[50%] border-t border-slate-200 p-6 md:p-1 md:border-0">
                            <h3>
                                <div className='mb-4 block text-2xl md:text-2xl text-black hover:text-primary text-center md:text-right'>
                                    إسم المنتج :
                                </div>
                                <div
                                    className="mb-4 block text-2xl md:text-3xl font-bold text-black hover:text-primary text-center md:text-right"
                                >
                                    {product.name}
                                </div>
                            </h3>
                            <div className='mb-4 block text-2xl md:text-2xl text-black hover:text-primary text-center md:text-right'>
                                الوصف :
                            </div>
                            <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color">
                                {product.description}
                            </p>
                            <p className="mb-6 border-opacity-10 pb-6 text-yellow-600 font-medium text-body-color text-center md:text-start">
                                <span className="text-slate-600 border p-1 me-2 rounded bg-opacity-80"> السعر بالجملة : </span>
                                <span className="border p-1 me-2 rounded bg-opacity-80">  {product.price} {currencyFormatter.currency} </span>
                            </p>
                            <div className="w-auto w-full" >
                                <div className="flex flex-wrap justify-center md:justify-start">
                                    <button className="flex items-center m-1 hover:bg-yellow-500 bg-yellow-600 text-white border p-2 rounded" onClick={() => orderProduct(product.id)}>
                                        طلب المنتج
                                    </button>
                                    <button className="flex items-center m-1 hover:bg-slate-200 bg-slate-100 text-slate-600 border p-2 rounded"
                                        onClick={() => addToCart(product.id)}>
                                        <FontAwesomeIcon className='ml-3' icon={faCirclePlus} /> اضف الي السلة
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <Loader />}
            </div>
        </div>
    )
}
