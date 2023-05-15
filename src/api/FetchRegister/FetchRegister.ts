import axios from "axios"
import { axiosBase } from "../../constants/baseAxios"
import { EQuerys } from "../../constants/paths"
import { IRegisterForm } from "../../types/type"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchRegister = createAsyncThunk(
	"isAuthUser",
	async (value: IRegisterForm, { rejectWithValue }) => {
		try {
			const response = await axiosBase.post(EQuerys.pageSignUp, {
				email: value.email,
				FirstName: value.firstName,
				SurName: value.surName,
				LastName: value.lastName,
				Organization: value.organisation,
				Specialization: value.specialization,
				PhoneNumber: value.phoneNumber,
			})
			return response.statusText
		} catch (err) {
			if (axios.isAxiosError(err)) {
				return rejectWithValue(err.response?.data)
			}
		}
	}
)
