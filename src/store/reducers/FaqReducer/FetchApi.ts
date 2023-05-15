import { EQuerys } from "../../../constants/paths"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { ITestQuestionsData } from "../../../types/type"
import { axiosBase } from "../../../constants/baseAxios"

export const FetchApiFaq = createAsyncThunk(
	"faq/faqAll",
	async (arg, { rejectWithValue }) => {
		try {
			const response = await axiosBase.get<ITestQuestionsData[]>(EQuerys.faq)
			return response.data
		} catch (error) {
			return rejectWithValue("error")
		}
	}
)
