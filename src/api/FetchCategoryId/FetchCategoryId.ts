import { createAsyncThunk } from "@reduxjs/toolkit"
import { EQuerys } from "../../constants/paths"
import { IHeaderEditComponent } from "../../types/type"
import { axiosBase } from "../../constants/baseAxios"

export const fetchCategoryId = createAsyncThunk(
	"Category/GetCategoryById",
	async (id: string, thunkAPI) => {
		try {
			const response = await axiosBase.get<IHeaderEditComponent>(
				EQuerys.CategoryId,
				{ params: { categoryId: id } }
			)
			return response.data
		} catch (e) {
			return thunkAPI.rejectWithValue("error")
		}
	}
)
