import { isRejectedWithValue } from "@reduxjs/toolkit"
import { ICreateTest } from "../../components/organisms/CreateTestSection/CreateTestSection"
import { EQuerys } from "../../constants/paths"
import { axiosBase } from "../../constants/baseAxios"

export const fetchCreateCategory = async (newCategory: ICreateTest) => {
	try {
		const response = await axiosBase.post(EQuerys.CreateCategory, {
			name: newCategory.name,
			description: newCategory.description,
			imageUrl:
				newCategory.imageUrl === ""
					? "https://sovman.ru/wp-content/uploads/2021/11/20944136-scaled.jpg"
					: newCategory.imageUrl,
		})
		return response.status
	} catch (e) {
		return isRejectedWithValue("error")
	}
}
