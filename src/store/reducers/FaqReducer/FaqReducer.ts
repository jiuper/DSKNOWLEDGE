import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IFaQuestion } from "../../../types/type"
import { FetchApiFaq } from "./FetchApi"

interface IFaqInterface {
	faq: IFaQuestion[]
	isLoading: boolean
	error: string
}

const initialState: IFaqInterface = {
	faq: [],
	isLoading: false,
	error: "",
}

export const FaqSlice = createSlice({
	name: "faq",
	initialState,
	reducers: {},
	extraReducers: {
		[FetchApiFaq.fulfilled.type]: (
			state,
			action: PayloadAction<IFaQuestion[]>
		) => {
			state.isLoading = true
			state.error = ""
			state.faq = action.payload
		},
		[FetchApiFaq.pending.type]: (state) => {
			state.isLoading = false
		},
		[FetchApiFaq.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false
			state.error = action.payload
		},
	},
})

export const faqAction = FaqSlice.actions
export const faqReducer = FaqSlice.reducer
