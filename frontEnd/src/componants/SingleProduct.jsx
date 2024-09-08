
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { addProductToAPI } from '../Utils/cardSlice';
import { useDispatch } from 'react-redux';
import { currencyFormatter } from '../Utils/helpers';


const SingleProduct = ({ product }) => {
  const { id, name, images, description, price } = product;
  const dispatch = useDispatch()

  const addToCart = (product) => {
    dispatch(addProductToAPI(product))
  }

  return (
    <>
      <div
        className="wow fadeInUp relative overflow-hidden rounded-md bg-[#4a6cf708] 
        shadow-one dark:bg-dark min-h-[500px] md:min-h-[650px] flex flex-col justify-evenly items-center shadow-md"
        data-wow-delay=".1s"
      >
        <Link
          to={`/product/${id}`}>
          <img className="w-[190px] max-w-[190px] md:w-[250px] md:max-w-[250px] h-[190px] max-h-[190px] md:h-[250px] md:max-h-[250px]" src={images[0].path} alt="image" style={{ objectFit: 'cover' }} />
        </Link>
        <div className="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8">
          <h3>
            <Link
              to={`/product/${id}`}
              className="text-center mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
            >
              {name}
            </Link>
          </h3>
          <p className="text-center mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color">
            {description.slice(0, 60)}...
          </p>
          <p className="text-center mb-6 border-opacity-10 pb-6 font-medium text-body-color">
            <span className="border text-slate-600 p-1 me-2 rounded bg-opacity-80"> السعر بالجملة : </span>
            <span className="p-1 font-bold text-slate-800 me-2 rounded bg-opacity-80">  {price} {currencyFormatter.currency} </span>
          </p>

          <div className="flex flex-wrap m-auto justify-center">
            <Link to={`/product/${id}`} className="flex items-center m-1 hover:bg-yellow-500 bg-yellow-600 text-white border p-2 rounded bg-opacity-70">
              تفاصيل المنتج
            </Link>
            <button className="flex items-center m-1 hover:bg-slate-200 bg-slate-100 text-slate-600 border p-2 rounded bg-opacity-80"
              onClick={() => addToCart(id)}>
              <FontAwesomeIcon className='ml-3' icon={faCirclePlus} /> اضف الي السلة
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
