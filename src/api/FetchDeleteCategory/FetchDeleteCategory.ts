import { isRejectedWithValue } from "@reduxjs/toolkit"
import { EQuerys } from "../../constants/paths"
import { axiosBase } from "../../constants/baseAxios"

export const fetchDeleteCategory = async (categoryId: string) => {
	try {
		const response = await axiosBase.delete(EQuerys.IdDeleteCategory, {
			params: {
				categoryId: categoryId,
			},
		})
		return response.status
	} catch (e) {
		return isRejectedWithValue("error")
	}
}
