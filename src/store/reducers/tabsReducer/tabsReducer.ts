import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IProfileSlice {
	selectedType: string;
	selectedTypeResultPage: string,
	selectedProfileType: string;
	selectedAdminAutorization:string;
	selectedAddQuestion:string;
	searchTests: string;
}

const initialState: IProfileSlice = {
	selectedType: "ForAuthorizations",
	selectedTypeResultPage: 'showAll',
	selectedProfileType: "isProfile",
	selectedAdminAutorization:"Анатомия",
	selectedAddQuestion:"Test",
	searchTests: "Все",
}

export const tabsSlice = createSlice({
	name: "tabs",
	initialState,
	reducers: {
		selectedType(state, action: PayloadAction<string>) {
			state.selectedType = action.payload
		},
		selectedTypeResultPage(state, action: PayloadAction<string>) {
			state.selectedTypeResultPage = action.payload
		},
		profileType(state, action: PayloadAction<string>) {
			state.selectedProfileType = action.payload
		},
		navigationAdminSelect(state, action:PayloadAction<string>) {
			state.selectedAdminAutorization = action.payload
		},
		addQuestionType(state, action:PayloadAction<string>){
			state.selectedAddQuestion = action.payload
		},
		serchTestsType(state, action:PayloadAction<string>) {
			state.searchTests = action.payload
		}
	}
})

export const tabsAction = tabsSlice.actions
export const tabsReducer = tabsSlice.reducer