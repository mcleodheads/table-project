import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    fetchAppConfiguration,
    fetchModalData,
    fetchPopupData,
    fetchSearchResults,
    fetchSelectorData
} from "../../API/API";

const initialState = {
    isLoading: false,
    error: '',
    config: [],
    chosenConfig: [],
    searchingResults: [],
    modalData: {
        isLoading: false,
        data: {},
    },
    filteredItems: {
        data: [],
        selectorFields: [],
        selectorsIsLoading: false,
        emptyResponse: false,
    },
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

export const getModalData = createAsyncThunk( // data for modal/form window
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

export const getPopupData = createAsyncThunk( // data for filter columns
    'fetchPopup',
    async ([name, config,], thunkAPI) => {
        try {
            const response = await fetchPopupData(name, config)
            return thunkAPI.dispatch(fetchPopupReducer(response,))
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const getSelectorsData = createAsyncThunk( // data for filter columns
    'fetchSelector',
    async ([name, field], thunkAPI) => {
        try {
            const response = await fetchSelectorData(name, field)
            return thunkAPI.dispatch(fetchSelectorReducer(response))
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
        fetchModalReducer(state, action) {},
        fetchPopupReducer(state, action) {
            console.log(action)
        },
        fetchSelectorReducer(state, action) {}
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

        [getPopupData.pending]: (state) => {
        },
        [getPopupData.fulfilled]: (state, action) => {
            state.filteredItems.data = action.payload.payload.data
            if (action.payload.payload.data.length === 0) {
                state.filteredItems.emptyResponse = true
            }
        },
        [getPopupData.rejected]: (state, action) => {
            state.error = action.payload
        },

        [getSelectorsData.pending]: (state) => {
            state.filteredItems.selectorsIsLoading = true
        },
        [getSelectorsData.fulfilled]: (state, action) => {
            state.filteredItems.selectorsIsLoading = false
            state.filteredItems.selectorFields = action.payload.payload.data
        },
        [getSelectorsData.rejected]: (state, action) => {
            state.filteredItems.selectorsIsLoading = false
            state.error = action.payload
        },
    }
})

export const {
    fetchConfigReducer,
    setChosenField,
    fetchSearchResultsReducer,
    fetchModalReducer,
    fetchPopupReducer,
    fetchSelectorReducer
} = configurationSlice.actions
export default configurationSlice.reducer