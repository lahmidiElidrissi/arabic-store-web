import React, { useEffect, useState } from 'react'
import SingleProduct from './SingleProduct';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Products() {


  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const url = import.meta.env.VITE_URL_BACKEND + '/products';
    axios.get(url)
      .then(response => {
        const DataProducts = response.data.products.data;
        setProducts(DataProducts);
      })
      .catch(error => {
        console.log(error);
      });

  }, []);

  const searchProduct = (e) => {
    const searchValue = e.target.value;
    const url = import.meta.env.VITE_URL_BACKEND + '/products?name=' + searchValue;

    if (searchValue.length >= 2 || searchValue.length === 0) {
      axios.get(url)
        .then(response => {
          const DataProducts = response.data.products.data;
          setProducts(DataProducts);
        }).catch(error => {
          console.log(error);
        });
    }

  };



  return (
    <section id="products" className="bg-white py-14 md:py-16 lg:py-14">
      <div className="container">
        <div className="wow fadeInUp w-full mx-auto text-center mb-6">
          <h2 className="text-3xl font-bold !leading-tight text-black sm:text-4xl md:text-[45px]"> المنتجات</h2>
        </div>
        <div className='flex flex-wrap items-center w-[80%] mx-auto justify-center mb-10'>
          <label className="relative block w-[90%] md:w-[40%] pe-1">
            <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-yellow-100 focus:ring-yellow-600 focus:ring-1 sm:text-sm" placeholder="  البحث عن منتج" type="text" name="search" onChange={searchProduct} />
          </label>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="w-full">
              <SingleProduct product={product} />
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => navigate("/shop") } className='w-[50%] md:w-[10%] text-1xl text-center text-slate-700 mx-auto block border border-slate-300 rounded-md p-3 m-5 shadow focus:outline-none focus:border-yellow-100 focus:ring-yellow-60 focus:ring-1'>تصفح المزيد</button>
    </section>
  )
}
