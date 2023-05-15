import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ITestComp {
	timeTimer: string;
	countQuestion: string;
}

const initialState: ITestComp = {
	timeTimer: "30",
	countQuestion: '80'
}

export const testCompletedSlice = createSlice({
	name: "tabs",
	initialState,
	reducers: {
		setTimeTimer(state, action: PayloadAction<string>) {
			state.timeTimer = action.payload
		},
		setCountQuestion(state, action: PayloadAction<string>) {
			state.countQuestion = action.payload
		}
	}
})

export const testCompletedAction = testCompletedSlice.actions
export const testCompletedReducer = testCompletedSlice.reducer