import { useDispatch } from 'react-redux';
import { addProductToAPI } from './cardSlice';

export const addToCart = (dispatch, productId) => {
    dispatch(addProductToAPI(productId));
};