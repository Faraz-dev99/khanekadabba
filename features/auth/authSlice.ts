import { getMe, loginUser,signupUser } from '@/api/auth/auth'
import { User } from '@/interfaces/auth/auth.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'




interface AuthState {
    user: User | null
    isAuthenticated: boolean
    loading: boolean
    error: string | null
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        logout: (state) => {
            state.user = null
            state.isAuthenticated = false
        },
    },

    extraReducers: (builder) => {
        builder

            //LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false
                state.user = action.payload
                state.isAuthenticated = true
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

            //GET ME (auto login)
            .addCase(getMe.pending, (state) => {
                state.loading = true
            })
            .addCase(getMe.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false
                state.user = action.payload
                state.isAuthenticated = true
            })
            .addCase(getMe.rejected, (state) => {
                state.loading = false
                state.user = null
                state.isAuthenticated = false
            })

            // SIGNUP
            .addCase(signupUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signupUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false
                state.user = action.payload
                state.isAuthenticated = true
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export const { logout } = authSlice.actions
export default authSlice.reducer