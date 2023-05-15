import { axiosBase } from "../../constants/baseAxios"
import { EQuerys } from "../../constants/paths"

export const fetchUploadTest = async (file: FormData) => {
	const response = await axiosBase.post(EQuerys.UploadFile, file, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	})
	return response.status
}
