import React, { useContext, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeProductFromAPI, updateQuantityProduct } from '../Utils/cardSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { currencyFormatter } from '../Utils/helpers';

export default function Card() {

  const products = useSelector((state) => state.card.products)
  const error = useSelector((state) => state.card.error)
  const cardId = useSelector((state) => state.card.cardId);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {setNavIsOpen} = useOutletContext()
  useEffect(() => {
    setNavIsOpen(false)
  }, [])

  console.log(error);
  

  const totalPrices = (products) => {
    let total = 0;
    products.forEach((product) => {
      total += product.price * product.pivot.quantity;
    });
    return total.toFixed(2);
  }

  const orderFromCard = () => {
    if (products && cardId) {
      navigate(`/order`, {
        state: {
          id: cardId,
          products: products,
          total: totalPrices(products)
        }
      });
    } else {
      console.error('Products or cardId is null');
      // You may want to throw an error here or handle it in some other way
    }
  }



  return (
    <div className='container border-t border-slate-200'>
      <div className='flex flex-wrap min-h-screen my-[50px]'>
        <div className='w-full h-[32vh] md:h-[40vh] md:w-[30%] bg-[#4a6cf708] p-2 md:p-5 md:ml-5'>
          <h1 className='text-2xl md:text-3xl mb-5'>التفاصيل :</h1>
          <div className='border border-slate-300 p-2 md:p-5 mx-[30px] min-h-[30%]'>
            <h1 className='my-3 md:my-5 text-[20px] md:text-2xl'>
              مجموع المنتجات : {products && (products.length > 0) ? products.length : 0}
            </h1>
            <hr />
            <h1 className='my-3 md:my-5 text-[20px] md:text-2xl'>
              اجمالي الاسعار : {products && (products.length > 0) ? totalPrices(products) : 0} { currencyFormatter.currency }
            </h1>
          </div>
          <div className='w-full m-5 flex justify-center items-center'>
            <button className='bg-yellow-600 text-white p-1 rounded w-[50%]' onClick={ orderFromCard }> طلب الآن </button>
          </div>
        </div>
        <div className='w-full md:w-[65%]'>
          <h1 className='text-3xl m-3'>السلة :</h1>
          {
            products && products.length ? (
              products.map((product) => (
                <div className='flex flex-wrap w-full items-center justify-start md:justify-between border p-5 m-2 border-slate-200' key={product.id}>
                  <Link
                    to={`/product/${product.id}`}>
                    <img className='w-[150px] md:w-[200px] pb-5 md:pb-0 md:border-l border-slote-600' src={`${product.images[0].path}`} alt="image" />
                  </Link>

                  <div className='w-full md:w-[25%]'>
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
                  <div className='m-3 md:m-5 font-bold'>{product.price} {currencyFormatter.currency}</div>
                  <div className='flex flex-wrap'>
                    <label className='p-1'> الكمية :  </label>
                    <input
                      className='w-[50px] border border-slate-200 text-center'
                      type="number"
                      value={product.pivot.quantity}
                      onChange={(e) => dispatch(
                        updateQuantityProduct({
                          id: product.id,
                          quantity: Number(e.target.value),
                        })
                      )}
                    />
                  </div>
                  <div>
                    <button className='text-xs md:text-[15px] bg-red-500 text-white m-1 p-2 rounded hover:bg-red-700' onClick={() => dispatch(removeProductFromAPI(product.id))}>
                      حذف المنتج <FontAwesomeIcon className='mr-2' icon={faTrash} />
                    </button>
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
