import { configureStore } from '@reduxjs/toolkit'
import homeReducer from '../containers/homePage/homeSlice';

export const store = configureStore({
  reducer: {
    home: homeReducer
  }
});