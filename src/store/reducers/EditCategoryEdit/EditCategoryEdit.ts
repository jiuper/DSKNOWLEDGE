import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchCatalogTest } from "../../../api/FetchCatalogTest/FetchCatalogTest"
import { fetchTestsList } from "../../../api/FetchTestsList/FetchTestsList"
import {
	ICatalogTestPage,
	IFullTest,
	ITestQuestionsData,
	ITestsCatalogPage,
} from "../../../types/type"
import { fetchTestById } from "../../../api/FetchTestById/FetchTestById"
import { fetchTestGeneraltoB } from "../../../api/fetchTestGeneraltoB/fetchTestGeneraltoB"

interface IEditCatalog {
	allCatalog: ICatalogTestPage[]
	testCatalog: ITestsCatalogPage[]
	testList: IFullTest | null

	isLoading: boolean
	error: string

	isOpen: boolean
	actionPos: string
	blockScore: boolean
}

const initialState: IEditCatalog = {
	allCatalog: [],
	testList: null,
	isLoading: false,
	error: "",

	isOpen: false,
	actionPos: "",
	testCatalog: [],
	blockScore: false,
}

export const editCategorySlice = createSlice({
	name: "editCategory",
	initialState,
	reducers: {
		getCategoryCatalog(state, action: PayloadAction<ICatalogTestPage[]>) {
			state.allCatalog = action.payload
		},
		selectCategory(state, action: PayloadAction<string>) {
			state.actionPos = action.payload
		},
		setBurger(state) {
			state.isOpen = !state.isOpen
		},
		setBlockScoreInput(state) {
			state.blockScore = !state.blockScore
		},
	},
	extraReducers: {
		[fetchCatalogTest.fulfilled.type]: (
			state,
			action: PayloadAction<ICatalogTestPage[]>
		) => {
			state.isLoading = false
			state.error = ""
			state.allCatalog = action.payload
		},
		[fetchCatalogTest.pending.type]: (state) => {
			state.isLoading = true
		},
		[fetchCatalogTest.rejected.type]: (
			state,
			action: PayloadAction<string>
		) => {
			state.isLoading = false
			state.error = action.payload
		},
		[fetchTestsList.fulfilled.type]: (
			state,
			action: PayloadAction<ITestsCatalogPage[]>
		) => {
			state.isLoading = false
			state.error = ""
			state.testCatalog = action.payload
		},
		[fetchTestsList.pending.type]: (state) => {
			state.isLoading = true
		},
		[fetchTestsList.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false
			state.error = action.payload
		},
		[fetchTestById.fulfilled.type]: (
			state,
			action: PayloadAction<IFullTest>
		) => {
			state.isLoading = false
			state.error = ""
			state.testList = action.payload
		},
		[fetchTestById.pending.type]: (state) => {
			state.isLoading = true
		},
		[fetchTestById.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false
			state.error = action.payload
		},
	},
})

export const editCategoryAction = editCategorySlice.actions
export const editCategoryReducer = editCategorySlice.reducer
