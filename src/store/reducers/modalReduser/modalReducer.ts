import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IModalReducer {
	isContactModalActive: boolean;
	isTestCategoryModalActive: boolean;
	isInfoItemModalActive: boolean;
	isProfileEdit: boolean;
	isPaginationTest: boolean;
	actualId: string | undefined;
	isTestQuestionModalActive: boolean;
	isLoaderFileTest: boolean;
	isTestGeneralToTest: boolean;
	removeSection: boolean;
	isTestDelete: boolean;
	uploadImage: boolean;
	donutModal: boolean;
}

const initialState: IModalReducer = {
	isContactModalActive: false,
	isTestCategoryModalActive: false,
	isProfileEdit: false,
	isPaginationTest: false,
	isInfoItemModalActive: false,
	removeSection: false,
	actualId: "",
	isTestQuestionModalActive: false,
	isLoaderFileTest: false,
	isTestGeneralToTest: false,
	isTestDelete: false,
	uploadImage: false,
	donutModal: false,
};

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		ModalChanger(state, action: PayloadAction<boolean>) {
			state.isContactModalActive = action.payload;
		},
		ModalChagerTestCalalog(state, action: PayloadAction<boolean>) {
			state.isTestCategoryModalActive = action.payload;
		},
		ModalCangerInfoItem(state, action: PayloadAction<boolean>) {
			state.isInfoItemModalActive = action.payload;
		},
		getActualItem(state, action: PayloadAction<string | undefined>) {
			state.actualId = action.payload;
		},
		ModalChangerTestQuestion(state, action: PayloadAction<boolean>) {
			state.isTestQuestionModalActive = action.payload;
		},
		ModalChangerTestDeleting(state, action: PayloadAction<boolean>) {
			state.isTestDelete = action.payload;
		},
		ModalUploadImage(state, action: PayloadAction<boolean>) {
			state.uploadImage = action.payload;
		},
		ModalIsProfileEdit(state, action: PayloadAction<boolean>) {
			state.isProfileEdit = action.payload;
		},
		ModalIsLoaderFileTest(state, action: PayloadAction<boolean>) {
			state.isLoaderFileTest = action.payload;
		},
		ModalTestGeneralToTest(state, action: PayloadAction<boolean>) {
			state.isTestGeneralToTest = action.payload;
		},
		ModalIsPaginationTest(state, action: PayloadAction<boolean>) {
			state.isPaginationTest = action.payload;
		},
		ModalRemoveSection(state, action: PayloadAction<boolean>) {
			state.removeSection = action.payload;
		},
		ModalDonut(state, action: PayloadAction<boolean>) {
			state.donutModal = action.payload;
		},
	},
});

export const modalAction = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
