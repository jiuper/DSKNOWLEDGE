import { createAsyncThunk } from "@reduxjs/toolkit"
import { EQuerys } from "../../constants/paths"
import { axiosBase } from "../../constants/baseAxios"

export const fetchUserDate = createAsyncThunk(
	"isAuth/login",
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await axiosBase.get(EQuerys.userUpdatePage, {
				params: {
					userId: id,
				},
			})
			return response.data
		} catch (e) {
			return rejectWithValue("error")
		}
	}
)
