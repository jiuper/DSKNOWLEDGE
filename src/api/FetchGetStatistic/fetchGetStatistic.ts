import { createAsyncThunk } from "@reduxjs/toolkit"
import { EQuerys } from "../../constants/paths"
import { IGetStatistic, IProgressCardStatistic } from "../../types/type"
import { axiosBase } from "../../constants/baseAxios"

export const fetchGetStatistic = createAsyncThunk(
	"passedTest/getStatistics",
	async (value: IGetStatistic, { rejectWithValue }) => {
		try {
			const response = await axiosBase.get<IProgressCardStatistic[]>(
				EQuerys.GetStatistic,
				{
					params: {
						userId: value.userId,
						month: value.month,
						year: value.year,
					},
				}
			)
			return response.data
		} catch (e) {
			return rejectWithValue("error")
		}
	}
)
