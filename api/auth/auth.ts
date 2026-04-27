import { API_ROUTES } from '@/constants/api/ApiRoutes';
import { SignupData } from '@/interfaces/auth/auth.interface';
import { createAsyncThunk } from '@reduxjs/toolkit'

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await fetch(API_ROUTES.AUTH.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!result.success) {
        return rejectWithValue(result.message)
      }

      return result.user
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(API_ROUTES.AUTH.GETME, {
        method: 'GET',
        credentials: 'include',
      })

      const result = await res.json()

      if (!result.success) {
        return rejectWithValue('Not authenticated')
      }

      return result.user
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)




export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (data: SignupData, { rejectWithValue }) => {
    try {
      const res = await fetch(API_ROUTES.AUTH.SIGNUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ⭐ important (cookie)
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!result.success) {
        return rejectWithValue(result.message)
      }

      return result.user
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)