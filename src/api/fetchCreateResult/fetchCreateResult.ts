import { isRejectedWithValue } from "@reduxjs/toolkit"
import { EQuerys } from "../../constants/paths"
import { ResultTestQustionType } from "../../types/type"
import { axiosBase } from "../../constants/baseAxios"

export const fetchCreateResult = async (result: ResultTestQustionType) => {
	try {
		const response = await axiosBase.post(EQuerys.CreateResult, {
			timeSpent: result.timeSpent,
			status: result.status,
			score: result.score * 10 / result.total,
			testId: result.testId,
			userId: result.userId,
			answeredQuestions: result.answeredQuestions,
		})
		return response.status
	} catch (e) {
		return isRejectedWithValue("error")
	}
}
