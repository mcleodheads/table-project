import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userLogin} from "../../API/API";

const initialState = {
    isAuth: false,
    isLoading: false,
    error: ''
}

export const loginRequest = createAsyncThunk(
    'login',
    async ({login, password, country = 'en'}, thunkAPI) => {
        try {
            const response = await userLogin(login, password, country)
            localStorage.setItem('token', response.data.accessToken)
            return thunkAPI.dispatch(loginReducer(response))

        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const logoutRequest = createAsyncThunk(
    'logout',
    async (_, thunkAPI) => {
        try {
            localStorage.removeItem('token')
            return thunkAPI.dispatch(logoutReducer())
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        loginReducer() {
            return
        },
        logoutReducer() {
            return
        },
        checkAuth(state) {
            state.isAuth = true
        }
    },
    extraReducers: {
        [loginRequest.pending]: (state) => {
            state.isLoading = true
        },
        [loginRequest.fulfilled]: (state) => {
            state.isLoading = false
            state.isAuth = true
        },
        [loginRequest.rejected]: (state, action) => {
            state.error = action.type
            state.isLoading = false
        },
        [logoutRequest.fulfilled]: (state) => {
            state.isAuth = false
        },
    },
})

export const {loginReducer, logoutReducer, checkAuth} = userAuthSlice.actions
export default userAuthSlice.reducer