import { isRejectedWithValue } from "@reduxjs/toolkit"
import { EQuerys } from "../../constants/paths"
import { ICreateTest } from "../../components/organisms/CreateTestSection/CreateTestSection"
import { axiosBase } from "../../constants/baseAxios"

export const fetchEditCategory = async (editCategory: ICreateTest) => {
	try {
		const response = await axiosBase.post(EQuerys.EditCategory, {
			id: editCategory.id,
			name: editCategory.name,
			description: editCategory.description,
			imageUrl:
				editCategory.imageUrl === ""
					? "https://by.joblum.com/uploads/3/2829.png"
					: editCategory.imageUrl,
		})
		return response.status
	} catch (e) {
		return isRejectedWithValue("error")
	}
}
