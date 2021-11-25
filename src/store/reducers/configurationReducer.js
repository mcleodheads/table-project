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
            return await fetchAppConfiguration()
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const getSearchResults = createAsyncThunk(
    'fetchResults',
    async ({name}, thunkAPI) => {
        try {
            return await fetchSearchResults(name)
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const getModalData = createAsyncThunk( // data for modal/form window
    'fetchModal',
    async ([name, id], thunkAPI) => {
        try {
            return await fetchModalData(name, id)
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const getPopupData = createAsyncThunk(
    'fetchPopup',
    async ([name, config,], thunkAPI) => {
        try {
            return await fetchPopupData(name, config)
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const getSelectorsData = createAsyncThunk(
    'fetchSelector',
    async ([name, field], thunkAPI) => {
        try {
            return await fetchSelectorData(name, field)
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const configurationSlice = createSlice({
    name: 'configuration',
    initialState,
    reducers: {
        setChosenField(state, action) {
            state.chosenConfig = [action.payload]
        },
    },
    extraReducers: {
        [getConfig.pending]: (state) => {
            state.isLoading = true
        },
        [getConfig.fulfilled]: (state, {payload}) => {
            state.isLoading = false
            state.config = payload.data.dictionaries
        },
        [getConfig.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },

        [getSearchResults.pending]: (state) => {
            state.isLoading = true
        },
        [getSearchResults.fulfilled]: (state, {payload}) => {
            state.isLoading = false
            state.searchingResults = payload.data.items
        },
        [getSearchResults.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },

        [getModalData.pending]: (state) => {
            state.modalData.isLoading = true
        },
        [getModalData.fulfilled]: (state, {payload}) => {
            state.modalData.isLoading = false
            state.modalData.data = payload.data
        },
        [getModalData.rejected]: (state, action) => {
            state.error = action.payload
        },

        [getPopupData.pending]: () => {},
        [getPopupData.fulfilled]: (state, {payload}) => {
            state.filteredItems.data = payload.data
            if (payload.data.length === 0) {
                state.filteredItems.emptyResponse = true
            }
        },
        [getPopupData.rejected]: (state, action) => {
            state.error = action.payload
        },

        [getSelectorsData.pending]: (state) => {
            state.filteredItems.selectorsIsLoading = true
        },
        [getSelectorsData.fulfilled]: (state, {payload}) => {
            state.filteredItems.selectorsIsLoading = false
            state.filteredItems.selectorFields = payload.data
        },
        [getSelectorsData.rejected]: (state, action) => {
            state.filteredItems.selectorsIsLoading = false
            state.error = action.payload
        },
    }
})

export const {setChosenField} = configurationSlice.actions
export default configurationSlice.reducer
