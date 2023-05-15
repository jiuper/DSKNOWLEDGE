import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchAllQuestionByTestId } from "../../../api/FetchAllQuestionsByTestId/FetchAllQuestionByTestId"
import { fetchTestById } from "../../../api/FetchTestById/FetchTestById"
import { ITestQuestionsData, ITestsCatalogPage } from "../../../types/type"
import { fetchTestGeneraltoB } from "../../../api/fetchTestGeneraltoB/fetchTestGeneraltoB"

interface ITestComponentReduser {
	isCommonTest:boolean
	chosenTest: ITestsCatalogPage | null
	testQouestion: ITestQuestionsData[]
	isLoading: boolean
	error: string
}

const initialState: ITestComponentReduser = {
	isCommonTest:false,
	chosenTest: null,
	testQouestion: [],
	isLoading: false,
	error: "",
}

export const TestComponentSlice = createSlice({
	name: "testComponent",
	initialState,
	reducers: {
		isTestCommon(state, action:PayloadAction<boolean>){
			state.isCommonTest = action.payload
		}
	},
	extraReducers: {
		[fetchTestById.fulfilled.type]: (
			state,
			action: PayloadAction<ITestsCatalogPage>
		) => {
			state.isLoading = false
			state.error = ""
			state.chosenTest = action.payload
		},
		[fetchTestById.pending.type]: (state) => {
			state.isLoading = true
		},
		[fetchTestById.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false
			state.error = action.payload
		},
		[fetchAllQuestionByTestId.fulfilled.type]: (
			state,
			action: PayloadAction<ITestQuestionsData[]>
		) => {
			state.isLoading = false
			state.error = ""
			state.testQouestion = action.payload
		},
		[fetchAllQuestionByTestId.pending.type]: (state) => {
			state.isLoading = true
		},
		[fetchAllQuestionByTestId.rejected.type]: (
			state,
			action: PayloadAction<string>
		) => {
			state.isLoading = false
			state.error = action.payload
		},
	},
})

export const testComponentAction = TestComponentSlice.actions
export const testComponentReducer = TestComponentSlice.reducer
