import React, { useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js'
import axiosHttpClient from '../Utils/api';
import { useDispatch } from 'react-redux';
import { emptyCard } from '../Utils/cardSlice';
import { currencyFormatter } from '../Utils/helpers';


export default function OrderPage() {

    const location = useLocation();
    const { id, products, total } = location.state || {};
    const fullName =  useRef([]);
    const phone =  useRef([]);
    const adresse =  useRef([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmitOrder = (e) => {
        e.preventDefault();
        const fullNameOrder = fullName.current.value;
        const phoneOrder = phone.current.value;
        const adresseOrder = adresse.current.value;
        if (fullNameOrder && phoneOrder && adresseOrder) {
            const url = import.meta.env.VITE_URL_BACKEND + '/orders';
            axiosHttpClient.post(url, {
                "id": id,
                "fullName": fullNameOrder,
                "phone": phoneOrder,
                "adresse": adresseOrder,
                "total": total,
                "products": products
            })
                .then(response => {
                        Toastify({
                            text: "تم تقديم طلبك بنجاح",
                            position: "center",
                            style : {
                                background: "linear-gradient(90deg, rgba(22,200,22,1) 0%, rgba(38,170,3,1) 43%, rgba(36,213,0,1) 100%)",
                                marginTop: "10vh",
                                width: "70%",
                            },
                        }).showToast();
                        // empty card
                        dispatch(emptyCard());
                        // make order url with whatsapp
                        let url = makeOrderUrlWithWhatsapp(fullNameOrder , adresseOrder);
                        // redirect to home
                        navigate( '/');
                        // redirect to order using whatsapp
                        window.location.href = url;
                        
                })
                .catch(error => {
                    console.error('Error submitting order', error);
                });
        }else{
            if (fullName.current && fullName.current.style) {
                fullName.current.style.border = "1px solid red";
            }
            if (phone.current && phone.current.style) {
                phone.current.style.border = "1px solid red";
            }
            if (adresse.current && adresse.current.style) {
                adresse.current.style.border = "1px solid red";
            }
            Toastify({
                text: "يرجى ملء جميع الحقول لإكمال طلبك" ,
                position: "center",
                style : {
                    background: "linear-gradient(107.2deg, rgb(150, 15, 15) 10.6%, rgb(247, 0, 0) 91.1%)",
                    marginTop: "10vh",
                    width: "70%",
                },
            }).showToast();
        }
      };

    const makeOrderUrlWithWhatsapp = (fullNameOrder , adresseOrder) => {

        let url = `https://wa.me/+212690591681?text=طلب جديد : %0D%0Aالاسم الكامل : ${fullNameOrder}%0D%0Aالعنوان : ${adresseOrder}%0D%0Aمنتجات:%0D%0A
        %0D%0A`;
        products.forEach((product) => {
            url +=`%0D%0Aاسم المنتج : ${product.name}%0D%0Aكمية : ${product.pivot.quantity}%0D%0Aرابط المنتج : ${import.meta.env.VITE_URL_FRONT_END}/product/${product.id}`;
            url += `%0D%0A
            %0D%0A`;
        });
        url += `%0D%0Aالمجموع : ${total} ${currencyFormatter.currency}`;

        return url
    }  

    return (
        <div className='container border-t border-slate-200'>
            <div className='flex flex-wrap min-h-screen my-[50px]'>
                <div className='w-full h-[75vh] md:h-[70vh] md:w-[40%] bg-[#4a6cf708] p-2 md:p-5 md:ml-5'>
                    <h1 className='text-2xl md:text-3xl mb-5'>التفاصيل :</h1>
                    <div className='border border-slate-300 p-2 md:p-5 mx-[30px] min-h-[30%]'>
                        <h1 className='my-3 md:my-5 text-[20px] md:text-2xl'>
                            مجموع المنتجات : {products && (products.length > 0) ? products.length : 0}
                        </h1>
                        <hr />
                        <h1 className='my-3 md:my-5 text-[20px] md:text-2xl text-green-800'>
                            المجموع : {products && (products.length > 0) ? total : 0} { currencyFormatter.currency }
                        </h1>
                    </div>

                    <form className='flex flex-wrap w-full justify-center space-y-5 mt-5'>
                        <label className='w-[60%] text-xl'> الاسم الكامل : </label>
                        <input className='w-[60%] rounded-lg border-gray-200 p-1 text-sm shadow-sm border border-slate-300' type="text" ref={fullName} required />
                        <label className='w-[60%] text-xl'> رقم هاتفك : </label>
                        <input className='w-[60%] rounded-lg border-gray-200 p-1 text-sm shadow-sm border border-slate-300' type="tel" ref={phone} required />
                        <label className='w-[60%] text-xl'> العنوان : </label>
                        <input className='w-[60%] rounded-lg border-gray-200 p-1 text-sm shadow-sm border border-slate-300' type="text" ref={adresse} required />

                        <div className='w-full m-5 flex justify-center items-center'>
                            <button className='bg-yellow-600 text-white p-1 rounded w-[50%]' onClick={handleSubmitOrder}> إكمال الطلب </button>
                        </div>
                    </form>

                </div>
                <div className='w-full md:w-[50%]'>
                    <h1 className='text-3xl m-3'>المنتجات :</h1>
                    {
                        products && products.length ? (
                            products.map((product) => (
                                <div className='flex flex-wrap w-full items-center justify-start md:justify-between border p-5 m-2 border-slate-200' key={product.id}>
                                    <Link
                                        to={`/product/${product.id}`}>
                                        <img className='w-[150px] md:w-[150px] pb-5 md:pb-0 md:border-l border-slote-600' src={`${product.images[0].path}`} alt="image" />
                                    </Link>

                                    <div className='w-full md:w-[50%]'>
                                        <div className='flex flex-wrap'>
                                            <Link
                                                to={`/product/${product.id}`}>
                                                <div className='text-2xl font-bold mb-2'>
                                                    {product.name}
                                                </div>
                                            </Link>
                                            <div className='my-3'>
                                                {product.description.slice(0, 80)} ...
                                            </div>
                                        </div>
                                    </div>
                                    <div className='md:border-r border-slote-600 p-5 font-bold'>
                                    <label className='p-1'> x الكمية :  </label>
                                        {product.pivot.quantity}
                                    </div>
                                </div>
                            ))
                        ) :
                            <p className='text-2xl text-center my-[15%] text-slate-400'>السلة فارغة</p>
                    }
                </div>
            </div>
        </div>
    )
}
