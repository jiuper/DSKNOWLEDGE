import { createAsyncThunk } from "@reduxjs/toolkit"
import { EQuerys } from "../../constants/paths"
import { ITestsCatalogPage } from "../../types/type"
import { axiosBase } from "../../constants/baseAxios"

export const fetchTestById = createAsyncThunk(
	"Test/GetTestById",
	async (id: string, thunkApi) => {
		try {
			const response = await axiosBase.get<ITestsCatalogPage>(
				EQuerys.TestById,
				{ params: { testId: id } }
			)
			return response.data
		} catch (e) {
			return thunkApi.rejectWithValue("error")
		}
	}
)
