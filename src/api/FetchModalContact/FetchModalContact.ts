import { AxiosError } from "axios"
import { EQuerys } from "../../constants/paths"
import { IFeedbackForm } from "../../types/type"
import { axiosBase } from "../../constants/baseAxios"

export const FetchModalContact = (value: IFeedbackForm) => {
	return axiosBase
		.post(EQuerys.feedbackCreateForm, {
			FirstName: value.name,
			SurName: value.surname,
			Description: value.problem,
			Email: value.email,
			Subject: value.theme,
		})
		.then((response) => response.data)
		.catch((err: AxiosError<Record<string, string>>) => {
			throw err.code
		})
}
