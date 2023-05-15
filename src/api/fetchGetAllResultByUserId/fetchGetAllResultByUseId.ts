import { createAsyncThunk } from "@reduxjs/toolkit";
import { EQuerys } from "../../constants/paths";
import { axiosBase } from "../../constants/baseAxios";

export const fetchGetAllResultByUser = createAsyncThunk(
	"passedTest/getAllByUser",
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await axiosBase.get(EQuerys.GetAllResults, {
				params: {
					userId: id,
				},
			});
			return response.data;
		} catch (e) {
			return rejectWithValue("error");
		}
	}
);
