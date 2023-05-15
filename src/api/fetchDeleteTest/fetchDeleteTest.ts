import { isRejectedWithValue } from "@reduxjs/toolkit"
import { EQuerys } from "../../constants/paths"
import { axiosBase } from "../../constants/baseAxios"

export const fetchDeleteTest = async (testId: string | undefined) => {
	try {
		const response = await axiosBase.delete(EQuerys.IdDeleteTest, {
			params: {
				testId: testId,
			},
		})
		return response.status
	} catch (e) {
		return isRejectedWithValue("error")
	}
}
