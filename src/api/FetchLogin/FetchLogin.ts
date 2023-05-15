import { EQuerys } from "../../constants/paths"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosBase } from "../../constants/baseAxios"

interface IFetchLogin {
	email: string
	password: string
}

export const fetchLogin = createAsyncThunk(
	"isAuth",
	async (userData: IFetchLogin, { rejectWithValue }) => {
		const response = await axiosBase
			.post(EQuerys.pageSignIn, {
				email: userData.email,
				password: userData.password,
			})
			.then((res) => {
				if (res.status === 200) {
					return res.data
				}
			})
			.catch((err) => {
				if (err.response.status === 400) {
					return rejectWithValue(err.response.data)
				} else {
					return rejectWithValue(err)
				}
			})

		return response
	}
)
