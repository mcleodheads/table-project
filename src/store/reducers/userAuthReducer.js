import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userLogin} from "../../API/API";

const initialState = {
    isAuth: false,
    isLoading: false,
    error: ''
}
export const checkAuth = createAction('userAuth/checkAuth')

export const loginRequest = createAsyncThunk(
    'login',
    async ({login, password, country = 'en'}, thunkAPI) => {
        try {
            const response = await userLogin(login, password, country)
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
        loginReducer(state, action) {
            localStorage.setItem('token', action.payload.data.accessToken)
        },
        logoutReducer(state) {
            localStorage.removeItem('token')
            state.isAuth = false
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
    },
})

const {loginReducer, logoutReducer} = userAuthSlice.actions
export default userAuthSlice.reducer