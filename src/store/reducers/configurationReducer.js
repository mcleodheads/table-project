import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchAppConfiguration} from "../../API/API";

const initialState = {
    isLoading: false,
    error: '',
    config: [],
    chosenConfig: []
}

export const getConfig = createAsyncThunk(
    'fetchConfig',
    async (_, thunkAPI) => {
        try {
            const response = await fetchAppConfiguration()
            return thunkAPI.dispatch(fetchConfigReducer(response.data))
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const configurationSlice = createSlice({
    name: 'configuration',
    initialState,
    reducers: {
        fetchConfigReducer(state, action) {
            state.config = action.payload.dictionaries
        },
        setChosenField(state, action) {
            state.chosenConfig = [action.payload]
        }
    },
    extraReducers: {
        [getConfig.pending]: (state) => {
            state.isLoading = true
        },
        [getConfig.fulfilled]: (state) => {
            state.isLoading = false
        },
        [getConfig.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export const {fetchConfigReducer, setChosenField} = configurationSlice.actions
export default configurationSlice.reducer