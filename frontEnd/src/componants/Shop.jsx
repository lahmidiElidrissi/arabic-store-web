import React, { useEffect, useRef, useState } from 'react'
import Products from './Products'
import axios from 'axios';
import SingleProduct from './SingleProduct';
import Pagination from './Pagination';

export default function Shop() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const inputSearch = useRef(null);
    const categoriesSelect = useRef(null);

    // get products when current page changed
    useEffect(() => {
        getProducts();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // get all categories
    useEffect(() => {
        const urlGetCategories = import.meta.env.VITE_URL_BACKEND + '/categories';
        axios.get(urlGetCategories)
            .then(response => {
                setCategories(response.data.categories);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const getProducts = () => {

        let urlGetProducts = import.meta.env.VITE_URL_BACKEND + '/products';
        let name = inputSearch.current.value;
        let category = categoriesSelect.current.value;

        urlGetProducts = serializingUrlProducts(urlGetProducts, name, category , currentPage);
    
        axios.get(urlGetProducts)
            .then(response => {
                const DataProducts = response.data.products.data;
                const lastPage = response.data.products.last_page;
                setProducts(DataProducts);
                setLastPage(lastPage);
            }).catch(error => {
                console.log(error);
            });
    };

    const serializingUrlProducts = (url, name, category) => {
        return url += '?name=' + name +'&category=' + category + '&page=' + currentPage;
    };

    return (
        <section className="bg-white py-14 md:py-16 lg:py-5 border-t border-slate-200">
            <div className="w-full mb-6">
                <div className="container">
                    <div className='flex flex-wrap'>

                        <div className='font-semibold w-[80%] mx-auto md-mx-0 md:w-[20%] mb-5 md:mb-0 md:pl-5 md:border-l md:border-slate-200'>
                            <div className='space-y-5'>
                                <h3 className='mb-4'> البحث عن منتج : </h3>
                                <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-yellow-100 focus:ring-yellow-600 focus:ring-1 sm:text-sm" placeholder="  البحث عن منتج" type="text" name="search" 
                                onChange={(e) => {
                                    getProducts();
                                    setCurrentPage(1);
                                }} 
                                ref={inputSearch} />

                                <select className='w-full' onChange={(e) => {
                                    getProducts();
                                    setCurrentPage(1);}
                                    } ref={categoriesSelect}>
                                    <option value="">الترتيب حسب الفئة</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>

                        </div>
                        <div className='w-[100%] md:w-[80%] p-1 md:pr-7 mt-2 md:mt-5'>
                            <h1 className="font-bold text-center text-black text-2xl md:text-[35px] mb-[40px] hidden md:block">تصفح المنتجات  : </h1>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
                                {products.map((product) => (
                                    <div key={product.id} className="w-full">
                                        <SingleProduct product={product} />
                                    </div>
                                ))}
                            </div>
                            <hr className='m-10' />
                            <Pagination currentPage={currentPage} lastPage={lastPage} onPageChange={handlePageChange} />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
