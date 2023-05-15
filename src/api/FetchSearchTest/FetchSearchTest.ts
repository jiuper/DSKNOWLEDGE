import { createAsyncThunk } from "@reduxjs/toolkit"
import { EQuerys } from "../../constants/paths"
import { axiosBase } from "../../constants/baseAxios"

export const fetchSearchTest = createAsyncThunk(
	"Test/SearchTests",
	async (serch: string, thunkApi) => {
		try {
			const response = await axiosBase.get(EQuerys.SearchTest, {
				params: { testName: serch },
			})
			return response.data
		} catch (e) {
			thunkApi.rejectWithValue("error")
		}
	}
)
