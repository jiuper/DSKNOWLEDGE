import { EQuerys } from "../../constants/paths"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { ITestsCatalogPage } from "../../types/type"
import { axiosBase } from "../../constants/baseAxios"

export const fetchTestsList = createAsyncThunk(
	"tests/testsList",
	async (categoryId: string, { rejectWithValue }) => {
		try {
			const response = await axiosBase.get<ITestsCatalogPage[]>(
				EQuerys.TestCategoryCards,
				{ params: { categoryId: categoryId } }
			)
			return response.data
		} catch (e) {
			return rejectWithValue("error")
		}
	}
)
