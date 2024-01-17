import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import { productSlice } from './productSlice'


const store = configureStore({
   reducer: {
       auth: authReducer,
       products: productSlice.reducer
   },
   middleware: (getDefaultMiddleware: any) => getDefaultMiddleware().concat(productSlice.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store