import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IProfileSlice {
	selectOptionCatalogPage: {
		title: string
		value: string
	}
	selectOptionTestsCatalogSmall: {
		title: string
		value: string
	}
	selectOptionTestsCatalogMiddle: {
		title: string
		value: string
	}
	selectOptionFeedbackForm: string
	selectOptionProgressSmall: string
	selectOptionProgressMiddle: {
		title: string
		value: string
	}
	selectOptionEditCategory: {
		title: string
		value: string
	}
	selectOptionAddQuesion: string
	cardID: string | undefined
	testCategory: string | undefined
	selectOptionTestComponent: {
		title: string
		value: string
	}
	selectAdminTask: {
		title: string
		value: string
	}
}

const initialState: IProfileSlice = {
	selectOptionCatalogPage: {
		title: "Новые",
		value: "",
	},
	selectOptionTestsCatalogSmall: {
		title: "Новые",
		value: "",
	},
	selectOptionTestsCatalogMiddle: {
		title: "Уровень",
		value: "",
	},
	selectOptionFeedbackForm: "Проблема со входом",
	selectOptionProgressSmall: "2023",
	selectOptionProgressMiddle: {
		title: "Месяц",
		value: "0",
	},
	selectOptionEditCategory: {
		title: "Время",
		value: "",
	},
	selectOptionAddQuesion: "few",
	cardID: undefined,
	testCategory: undefined,
	selectOptionTestComponent: {
		title: "Вид задания",
		value: "default",
	},
	selectAdminTask: {
		title: "Задания",
		value: "",
	},
}

export const selectSlice = createSlice({
	name: "select",
	initialState,
	reducers: {
		selectOptionCatalogPage(
			state,
			action: PayloadAction<{ value: string; title: string }>
		) {
			state.selectOptionCatalogPage = action.payload
		},
		selectOptionTestsCatalogSmall(
			state,
			action: PayloadAction<{ value: string; title: string }>
		) {
			state.selectOptionTestsCatalogSmall = action.payload
		},
		selectOptionTestsCatalogMiddle(
			state,
			action: PayloadAction<{ value: string; title: string }>
		) {
			state.selectOptionTestsCatalogMiddle = action.payload
		},
		selectOptionProgressSmall(state, action: PayloadAction<string>) {
			state.selectOptionProgressSmall = action.payload
		},
		selectOptionProgressMiddle(
			state,
			action: PayloadAction<{ value: string; title: string }>
		) {
			state.selectOptionProgressMiddle = action.payload
		},
		selectOptionFeedbackForm(state, action: PayloadAction<string>) {
			state.selectOptionFeedbackForm = action.payload
		},
		setCardID(state, action: PayloadAction<string | undefined>) {
			state.cardID = action.payload
		},
		setTestCategory(state, action: PayloadAction<string | undefined>) {
			state.testCategory = action.payload
		},
		selectOptionEditCatalog(
			state,
			action: PayloadAction<{ value: string; title: string }>
		) {
			state.selectOptionEditCategory = action.payload
		},
		selectOptionAddQuestion(state, action: PayloadAction<string>) {
			state.selectOptionAddQuesion = action.payload
		},
		selectOptionTestComponent(
			state,
			action: PayloadAction<{ value: string; title: string }>
		) {
			state.selectOptionTestComponent = action.payload
		},
		selectAdminTask(
			state,
			action: PayloadAction<{ value: string; title: string }>
		) {
			state.selectAdminTask = action.payload
		},
	},
})

export const selectAction = selectSlice.actions
export const selectReducer = selectSlice.reducer
