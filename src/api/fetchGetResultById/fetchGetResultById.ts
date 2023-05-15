import { createAsyncThunk } from "@reduxjs/toolkit"
import { EQuerys } from "../../constants/paths"
import { ITestQustion } from "../../types/type"
import { axiosBase } from "../../constants/baseAxios"

export const fetchGetResultById = createAsyncThunk(
	"passedTest/getById",
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await axiosBase.get<ITestQustion>(
				EQuerys.getResultById,
				{
					params: {
						passedTestId: id,
					},
				}
			)
			return response.data
		} catch (e) {
			return rejectWithValue("error")
		}
	}
)
