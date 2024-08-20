import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../Utils/counterSlice'
import cardReducer from './cardSlice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    card: cardReducer,
  },
})