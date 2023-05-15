import { createAsyncThunk } from "@reduxjs/toolkit"
import { EQuerys } from "../../constants/paths"
import { ITestQuestionsData } from "../../types/type"
import { axiosBase } from "../../constants/baseAxios"

export const fetchAllQuestionByTestId = createAsyncThunk(
	"/Question/GetAllByTest",
	async (id: string, thunkApi) => {
		try {
			const response = await axiosBase.get<ITestQuestionsData[]>(
				EQuerys.AllQuestionsByTestId,
				{ params: { testId: id } }
			)
			return response.data
		} catch (e) {
			return thunkApi.rejectWithValue("error")
		}
	}
)
