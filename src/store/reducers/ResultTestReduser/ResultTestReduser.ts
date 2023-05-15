import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchGetAllResultByUser } from "../../../api/fetchGetAllResultByUserId/fetchGetAllResultByUseId"
import { fetchGetResultById } from "../../../api/fetchGetResultById/fetchGetResultById"
import { fetchGetStatistic } from "../../../api/FetchGetStatistic/fetchGetStatistic"
import {
	IProgressCardStatistic,
	ITestQustion,
	ResultTestQustionType,
} from "../../../types/type"

interface IResultTestReduser {
	results: ResultTestQustionType
	allResultByUser: ITestQustion[]
	statistic: IProgressCardStatistic[]
	isLoading: boolean
	error: string
}

const initialState: IResultTestReduser = {
	results: {
		timeSpent: "",
		status: "",
		score: 0,
		total:0,
		testId: "",
		userId: "",
		answeredQuestions: [],
	},
	statistic: [],
	allResultByUser: [],
	isLoading: false,
	error: "",
}

export const ResultTestSlice = createSlice({
	name: "resultTest",
	initialState,
	reducers: {
		getResultTest(state, action: PayloadAction<ResultTestQustionType>) {
			state.results = action.payload
		},
	},
	extraReducers: {
		[fetchGetAllResultByUser.fulfilled.type]: (
			state,
			action: PayloadAction<ITestQustion[]>
		) => {
			state.allResultByUser = action.payload
			state.isLoading = false
			state.error = ""
		},
		[fetchGetAllResultByUser.pending.type]: (state) => {
			state.isLoading = true
		},
		[fetchGetAllResultByUser.rejected.type]: (
			state,
			action: PayloadAction<string>
		) => {
			state.isLoading = false
			state.error = action.payload
		},

		[fetchGetResultById.fulfilled.type]: (
			state,
			action: PayloadAction<ResultTestQustionType>
		) => {
			state.results = action.payload
			state.isLoading = false
			state.error = ""
		},
		[fetchGetResultById.pending.type]: (state) => {
			state.isLoading = true
		},
		[fetchGetResultById.rejected.type]: (
			state,
			action: PayloadAction<string>
		) => {
			state.isLoading = false
			state.error = action.payload
		},
		[fetchGetStatistic.fulfilled.type]: (
			state,
			action: PayloadAction<IProgressCardStatistic[]>
		) => {
			state.statistic = action.payload
			state.isLoading = false
			state.error = ""
		},
		[fetchGetStatistic.pending.type]: (state) => {
			state.isLoading = true
		},
		[fetchGetStatistic.rejected.type]: (
			state,
			action: PayloadAction<string>
		) => {
			state.isLoading = false
			state.error = action.payload
		},
	},
})

export const resultTestAction = ResultTestSlice.actions
export const resultTestReduser = ResultTestSlice.reducer
