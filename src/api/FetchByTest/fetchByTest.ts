import { EQuerys } from "../../constants/paths"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { ITestQuestionsData } from "../../types/type"
import { axiosBase } from "../../constants/baseAxios"

export const fetchByTest = createAsyncThunk(
	"tests/testByName",
	async (id: string, thunkApi) => {
		try {
			const response = await axiosBase.get<ITestQuestionsData[]>(
				EQuerys.QuestionTest,
				{ params: { testId: id } }
			)
			return response.data
		} catch (e) {
			return thunkApi.rejectWithValue("error")
		}
	}
)
