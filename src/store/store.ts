import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { tabsReducer } from "./reducers/tabsReducer/tabsReducer";
import { profileReducer } from "./reducers/profileReducer/profileReducer"
import { isAuthReducer } from "./reducers/isAuthReducer/isAuthReducer"
import { modalReducer } from "./reducers/modalReduser/modalReducer"
import { selectReducer } from "./reducers/SelectReduser/SelectReduser"
import { testCompletedReducer } from "./reducers/testCompleted/testCompleted"
import { faqReducer } from "./reducers/FaqReducer/FaqReducer"
import { catalogTestReducer } from "./reducers/CatalogTestReducer/CatalogTestReducer"
import { TestDescReducer } from "./reducers/TestsForDescription/TestsForDescription"
import { imageSelectReduser } from "./reducers/ImageSelectReducer/ImageSelectReducer"
import {editCategoryReducer} from "./reducers/EditCategoryEdit/EditCategoryEdit"
import { testComponentReducer } from "./reducers/TestComponentReducer/testComponentReduser";
import { categoryIdReducer } from "./reducers/CategoryIdReducer/CategoryIdReducer";
import { resultTestReduser } from "./reducers/ResultTestReduser/ResultTestReduser";
import { searchTestsReducer } from "./reducers/SearchTestsReducer/SearchTestsReducer"

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
	})
}

const rootReducer = combineReducers({
	tabsReducer,
	modalReducer,
	profileReducer,
	isAuthReducer,
	selectReducer,
	testCompletedReducer,
	faqReducer,
	catalogTestReducer,
	TestDescReducer,
	imageSelectReduser,
	editCategoryReducer,
	testComponentReducer,
	categoryIdReducer,
	resultTestReduser,
	searchTestsReducer,
})

export type RootReducer = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]