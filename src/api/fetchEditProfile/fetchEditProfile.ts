import { EQuerys } from "../../constants/paths"
import { IModalProfileEdit } from "../../types/type"
import { axiosBase } from "../../constants/baseAxios"

export const fetchEditProfile = async (userData: IModalProfileEdit) => {
	try {
		const response = await axiosBase.post(EQuerys.userEditPage, {
			id: userData.id,
			firstName: userData.firstName,
			surName: userData.surName,
			lastName: userData.lastName,
			organization: userData.organization,
			specialization: userData.specialization,
			email: userData.email,
			phoneNumber: userData.phoneNumber,
			iconUrl: userData.iconUrl,
		})

		return response.data
	} catch (e) {
		return "error"
	}
}
