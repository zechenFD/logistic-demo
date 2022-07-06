import { configureStore } from '@reduxjs/toolkit'
import {apiSlice} from './containers/homePage/apiSlice'
import homeReducer from './containers/homePage/homeSlice';

export const store = configureStore({
  reducer: {
    mockData:homeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  }
});