import { ICatalogTestPage, ITestsCatalogPage } from "../../../types/type"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchCatalogTest } from "../../../api/FetchCatalogTest/FetchCatalogTest"
import { fetchTestsList } from "../../../api/FetchTestsList/FetchTestsList"
import { fetchSearchTest } from "../../../api/FetchSearchTest/FetchSearchTest"

interface ICatalogTest {
	testLists: ICatalogTestPage[];
	isLoading: boolean;
	error: string;
	testsCatalog: ITestsCatalogPage[];
	nameTests: string;
}

const initialState: ICatalogTest = {
	testLists: [],
	testsCatalog: [],
	isLoading: false,
	error: "",
	nameTests: ""
}

export const CatalogTestSlice = createSlice({
	name: "catalogTest",
	initialState,
	reducers: {
		setNameTests(state, action: PayloadAction<string>) {
			state.nameTests = action.payload
		},
		testTestFetchSuccess(state, action: PayloadAction<ITestsCatalogPage[]>) {
			state.isLoading = false
			state.error = ""
			state.testsCatalog = action.payload
		}
	},
	extraReducers: {
		[fetchCatalogTest.fulfilled.type]: (state, action: PayloadAction<ICatalogTestPage[]>) => {
			state.isLoading = false
			state.error = ""
			state.testLists = action.payload
		},
		[fetchCatalogTest.pending.type]: (state) => {
			state.isLoading = true
		},
		[fetchCatalogTest.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false
			state.error = action.payload
		},
		[fetchTestsList.fulfilled.type]: (state, action: PayloadAction<ITestsCatalogPage[]>) => {
			state.isLoading = false
			state.error = ""
			state.testsCatalog = action.payload
		},
		[fetchTestsList.pending.type]: (state) => {
			state.isLoading = true
		},
		[fetchTestsList.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false
			state.error = action.payload
		},
		[fetchSearchTest.fulfilled.type]: (state, action: PayloadAction<ITestsCatalogPage[]>) => {
			state.isLoading = false
			state.error = ""
			state.testsCatalog = action.payload
		},
		[fetchSearchTest.pending.type]: (state) => {
			state.isLoading = true
		},
		[fetchSearchTest.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false
			state.error = action.payload
		}
	}
})

export const catalogTestAction = CatalogTestSlice.actions
export const catalogTestReducer = CatalogTestSlice.reducer