import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchAppConfiguration, fetchModalData, fetchSearchResults} from "../../API/API";

const initialState = {
    isLoading: false,
    error: '',
    config: [],
    chosenConfig: [],
    searchingResults: [],
    modalData: {
        isLoading: false,
        data: {},
    }
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

export const getSearchResults = createAsyncThunk(
    'fetchResults',
    async ({name}, thunkAPI) => {
        try {
            const response = await fetchSearchResults(name)
            return thunkAPI.dispatch(fetchSearchResultsReducer(response.data.items))
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const getModalData = createAsyncThunk(
    'fetchModal',
    async ([name, id], thunkAPI) => {
        try {
            const response = await fetchModalData(name, id)
            return thunkAPI.dispatch(fetchModalReducer(response))
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
        },
        fetchSearchResultsReducer(state, action) {
            state.searchingResults = action.payload
        },
        fetchModalReducer(state, action) {
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
        [getSearchResults.pending]: (state) => {
            state.isLoading = true
        },
        [getSearchResults.fulfilled]: (state, action) => {
            state.isLoading = false
            state.searchingResults = action.payload.payload
        },
        [getSearchResults.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        [getModalData.pending]: (state) => {
            state.modalData.isLoading = true
        },
        [getModalData.fulfilled]: (state, action) => {
            state.modalData.isLoading = false
            state.modalData.data = action.payload.payload.data
        },
        [getModalData.rejected]: (state, action) => {
            state.error = action.payload
        },
    }
})

export const {
    fetchConfigReducer,
    setChosenField,
    fetchSearchResultsReducer,
    fetchModalReducer,
} = configurationSlice.actions
export default configurationSlice.reducer