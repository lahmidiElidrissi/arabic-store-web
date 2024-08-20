import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import axiosHttpClient from './api';

const initialState = {
  products: [],
  status: 'idle',
  error: null,
  cardId: null,
}


// Thunks for async actions
export const fetchProducts = createAsyncThunk('card/fetchProducts', async () => {
  const response = await axiosHttpClient.get(import.meta.env.VITE_URL_BACKEND + '/card/products');
  return response.data;
});

export const addProductToAPI = createAsyncThunk('card/addProduct', async (id) => {
  const response = await axiosHttpClient.post(import.meta.env.VITE_URL_BACKEND + `/card/add/product/${id}`);
  return response.data;
});

export const removeProductFromAPI = createAsyncThunk('card/removeProduct', async (id) => {
  await axiosHttpClient.delete(import.meta.env.VITE_URL_BACKEND + `/card/remove/product/${id}`);
  return id;
});

export const updateQuantityProduct = createAsyncThunk('card/updateQuantityProduct', async ({id , quantity}) => {
  const response = await axiosHttpClient.post(import.meta.env.VITE_URL_BACKEND + `/card/update/product/quantity/${id}/${quantity}`);
  return response.data;
});

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products = [...state.products, action.payload.product]
      state.cardId = action.payload.cardId;
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload)
    },
    emptyCard: (state) => {
      state.products = []
      state.status = "idle"
      state.cardId = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
        state.cardId = action.payload.cardId;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProductToAPI.fulfilled, (state, action) => {
        if (action.payload.product != null){
          state.products = [...state.products, action.payload.product]
          state.cardId = action.payload.cardId;
        }
      })
      .addCase(removeProductFromAPI.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product.id !== action.payload);
      })
      .addCase(updateQuantityProduct.fulfilled, (state, action) => {
        state.products = state.products.map((product) => {
          if (product.id == action.payload.id) {
            return {
              ...product,
              pivot: { ...product.pivot, quantity: Number(action.payload.quantity) }
            };
          }
          return product;
        });
      });
  },
})

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, emptyCard } = cardSlice.actions

export default cardSlice.reducer