import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import appAxios from '../services/appAxios'
import { RegisterFormData } from '../pages/Registration'
import { LoginFormData } from '../pages/Login'

export const registerUser = createAsyncThunk(
   '/auth/register',
   async (data: RegisterFormData, { rejectWithValue }) => {
       try {
           await appAxios.post(
               '/auth/register',
               data,
           )
       } catch (error: any) {
           if (error.response && error.response.data.message) {
               return rejectWithValue(error.response.data.message)
           } else {
               return rejectWithValue(error.message)
           }
       }
   }
)

export const login = createAsyncThunk(
   '/auth/login',
   async (body: LoginFormData, { rejectWithValue }) => {
       try {
           const { data } = await appAxios.post(
               '/auth/login',
               body,
           )
           localStorage.setItem('userToken', data.jwt)
           return data;
       } catch (error: any) {
           // return custom error message from backend if present
           if (error.response && error.response.data.message) {
               return rejectWithValue(error.response.data.message)
           } else {
               return rejectWithValue(error.message)
           }
       }
   }
)
const userToken = localStorage.getItem('userToken')
 ? localStorage.getItem('userToken')
 : null

const initialState = {
   loading: false,
   userInfo: null, 
   userToken, 
   error: null,
   success: false, 
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logout: (state) => {
          localStorage.removeItem('userToken')
          state.loading = false
          state.userInfo = null
          state.userToken = null
          state.error = null
      }
  },
   extraReducers: (builder) => {
      builder.addCase(registerUser.pending, (state) => {
          state.loading = true
          state.error = null
      })
      builder.addCase(registerUser.fulfilled, (state) => {
          state.loading = false
          state.success = true
      })
      builder.addCase(registerUser.rejected, (state, action: any) => {
          state.loading = false
          state.error = action.payload
      })

      builder.addCase(login.pending, (state) => {
         state.loading = true
         state.error = null
     })
     builder.addCase(login.fulfilled, (state, action: any) => {
         state.loading = false
         state.userInfo = action.payload
         state.userToken = action.payload.jwt
     })
     builder.addCase(login.rejected, (state, action: any) => {
         state.loading = false
         state.error = action.payload
     })
  }
})


export const { logout } = authSlice.actions
export default authSlice.reducer