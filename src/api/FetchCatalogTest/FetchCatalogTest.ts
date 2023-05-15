import { EQuerys } from "../../constants/paths"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { ICatalogTestPage } from "../../types/type"
import { axiosBase } from "../../constants/baseAxios"

export const fetchCatalogTest = createAsyncThunk(
	"tests/catalogTests",
	async (_, thunkApi) => {
		try {
			const response = await axiosBase.get<ICatalogTestPage[]>(
				EQuerys.catalogTest
			)
			return response.data
		} catch (e) {
			return thunkApi.rejectWithValue("error")
		}
	}
)
