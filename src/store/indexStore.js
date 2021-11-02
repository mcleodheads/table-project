import {configureStore} from "@reduxjs/toolkit";
import thunk from 'redux-thunk'
import userAuthSlice from "./reducers/userAuthReducer";

export const store = configureStore({
    reducer: {
        authReducer: userAuthSlice
    },
    middleware: [thunk]
})