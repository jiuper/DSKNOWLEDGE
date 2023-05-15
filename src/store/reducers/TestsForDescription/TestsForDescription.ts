import { IFullTest, ITestQuestionsData } from "../../../types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchByTest } from "../../../api/FetchByTest/fetchByTest";
import { fetchTestGeneraltoB } from "../../../api/fetchTestGeneraltoB/fetchTestGeneraltoB";
import { fetchExamTest } from "../../../api/FetchExamTest/fetchExamTest";

interface ICatalogTest {
	testLists: ITestQuestionsData[];
	isLoading: boolean;
	error: string;
	totalBar: string[];
	arrStyle: string;
}

const initialState: ICatalogTest = {
	testLists: [],
	isLoading: false,
	error: "",

	totalBar: [],
	arrStyle: "",
};

export const TestDescSlice = createSlice({
	name: "testDesc",
	initialState,
	reducers: {
		setTotalBar(state, action: PayloadAction<string[]>) {
			state.totalBar = action.payload;
		},
		setArrStyle(state, action: PayloadAction<string>) {
			state.arrStyle = action.payload;
		},
		setEmptyTestLists(state) {
			state.testLists = [];
		},
	},
	extraReducers: {
		[fetchByTest.fulfilled.type]: (
			state,
			action: PayloadAction<ITestQuestionsData[]>
		) => {
			state.isLoading = true;
			state.error = "";
			state.testLists = action.payload;
		},
		[fetchByTest.pending.type]: (state) => {
			state.isLoading = false;
		},
		[fetchByTest.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		[fetchTestGeneraltoB.fulfilled.type]: (
			state,
			action: PayloadAction<ITestQuestionsData[]>
		) => {
			state.isLoading = false;
			state.error = "";
			state.testLists = action.payload;
		},
		[fetchTestGeneraltoB.pending.type]: (state) => {
			state.isLoading = true;
		},
		[fetchTestGeneraltoB.rejected.type]: (
			state,
			action: PayloadAction<string>
		) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		[fetchExamTest.fulfilled.type]: (
			state,
			action: PayloadAction<ITestQuestionsData[]>
		) => {
			state.isLoading = false;
			state.error = "";
			state.testLists = action.payload;
		},
		[fetchExamTest.pending.type]: (state) => {
			state.isLoading = true;
		},
		[fetchExamTest.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const TestDescAction = TestDescSlice.actions;
export const TestDescReducer = TestDescSlice.reducer;
