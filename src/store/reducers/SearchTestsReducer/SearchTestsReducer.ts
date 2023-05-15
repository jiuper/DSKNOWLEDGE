import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSearchTest } from "../../../api/FetchSearchTest/FetchSearchTest";
import { ITestsCatalogPage } from "../../../types/type";

interface SearchTestsReducerType {
    searchTestData: ITestsCatalogPage[]
    isLoading: boolean;
	error: string;
	nameTests: string;
    searchText: string;
}

const initialState: SearchTestsReducerType = {
    searchTestData: [],
    isLoading: false,
	error: "",
	nameTests: "",
    searchText: "",
}

export const SearchTestsReducer = createSlice({
    name: "searchTests",
    initialState,
    reducers: {
        setSearchText(state) {
            state.searchTestData = []
        },
        searchText(state, action: PayloadAction<string>) {
            state.searchText = action.payload
        }
    },
    extraReducers: {
        [fetchSearchTest.fulfilled.type]: (state, action: PayloadAction<ITestsCatalogPage[]>) => {
            state.isLoading = false
			state.error = ""
			state.searchTestData = action.payload
        },
        [fetchSearchTest.pending.type]: (state) => {
			state.isLoading = true
		},
		[fetchSearchTest.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false
			state.error = action.payload
		},
    }
})

export const    searchTestsAction = SearchTestsReducer.actions
export const searchTestsReducer = SearchTestsReducer.reducer
