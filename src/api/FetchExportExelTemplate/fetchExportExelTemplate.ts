import { axiosBase } from "../../constants/baseAxios"
import { EQuerys } from "../../constants/paths"
import { saveAs } from "file-saver"


export const exportExelTemplate = () => {
	 axiosBase
		.get(EQuerys.ExportExelTemplate, {
			responseType: "blob",
		})
		.then((response) => {
			saveAs(new Blob([response.data]), "template.xlsx")
		})
}
