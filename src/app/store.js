import { configureStore } from '@reduxjs/toolkit'
import { homeReducer } from '../containers/homePage/homeSlice';
import employeesInfoReducer from '../containers/employees/employeesSlice';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    employeesInfo: employeesInfoReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});