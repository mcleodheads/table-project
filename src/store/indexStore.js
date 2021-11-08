import {configureStore} from "@reduxjs/toolkit";
import thunk from 'redux-thunk'
import userAuthSlice from "./reducers/userAuthReducer";
import configurationSlice from "./reducers/configurationReducer";

export const store = configureStore({
    reducer: {
        authReducer: userAuthSlice,
        configReducer: configurationSlice
    },
    middleware: [thunk]
})