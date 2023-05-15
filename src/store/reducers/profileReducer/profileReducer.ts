import { createSlice } from "@reduxjs/toolkit"

interface IProfileSlice {
	profileCatalog: string | null
}

const initialState: IProfileSlice = {
	profileCatalog: null
}

export const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {},
	extraReducers: {

	},
})

export const profileAction = profileSlice.actions
export const profileReducer = profileSlice.reducer