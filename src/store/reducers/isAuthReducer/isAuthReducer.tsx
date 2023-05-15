import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IRespProfileInfo } from "../../../types/type"
import { fetchLogin } from "../../../api/FetchLogin/FetchLogin"
import { fetchUserDate } from "../../../api/FetchUserData/fetchUserDate"
import { fetchRegister } from "../../../api/FetchRegister/FetchRegister"

interface IIsAuthSlice {
	isLoading: boolean
	error: string
	loginListsData: IRespProfileInfo | null
	message: string
}

const initialState: IIsAuthSlice = {
	loginListsData: null,
	isLoading: false,
	error: "",
	message: "",
}

export const isAuthSlice = createSlice({
	name: "isAuth",
	initialState,
	reducers: {
		isAuth(state, action: PayloadAction<IRespProfileInfo | null>) {
			state.loginListsData = action.payload
		},
		isLogout(state) {
			state.loginListsData = null
			state.message = ""
		},
	},
	extraReducers: {
		[fetchLogin.fulfilled.type]: (
			state,
			action: PayloadAction<IRespProfileInfo>
		) => {
			state.isLoading = false
			state.error = ""
			state.loginListsData = action.payload
		},
		[fetchLogin.pending.type]: (state) => {
			state.isLoading = true
		},
		[fetchLogin.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = true
			state.error = action.payload
		},
		[fetchUserDate.fulfilled.type]: (
			state,
			action: PayloadAction<IRespProfileInfo>
		) => {
			state.isLoading = false
			state.error = ""
			state.loginListsData = action.payload
		},
		[fetchUserDate.pending.type]: (state) => {
			state.isLoading = true
		},
		[fetchUserDate.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = true
			state.error = action.payload
		},
		[fetchRegister.fulfilled.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false
			state.error = ""
			state.message = action.payload
		},
		[fetchRegister.pending.type]: (state) => {
			state.isLoading = true
			state.error = ""
		},
		[fetchRegister.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = true
			state.error = action.payload
		},
	},
})

export const isAuthAction = isAuthSlice.actions
export const isAuthReducer = isAuthSlice.reducer
