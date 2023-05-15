import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosBase } from "../../constants/baseAxios";
import { EQuerys } from "../../constants/paths";
import { IFetchExamTest } from "../../types/type";

export const fetchExamTest = createAsyncThunk(
	"test/GetFinalTest",
	async (data: IFetchExamTest, { rejectWithValue }) => {
		try {
			const responce = await axiosBase.post(EQuerys.GetFinalExam, {
				categoryId: data.categoryId,
				isTestOnTime: data.isTestOnTime,
				timeForTest: data.timeForTest,
				cntQuestions: data.cntQuestions,
			});
			return responce.data;
		} catch (e) {
			rejectWithValue("error");
		}
	}
);
