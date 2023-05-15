import { useState } from "react"
import {
	dataAddQuestionForms,
} from "../../../constants/links"
import { Select } from "./Select"

interface ISelectForAddi {
	onSelectAnserMethod: (value: string, title: string) => void
	classPrefix: string
	questionType: string
}

export const SelectForAddi = ({
	onSelectAnserMethod,
	classPrefix,
	questionType,
}: ISelectForAddi) => {
	const title = dataAddQuestionForms
		.filter((el) => el.value === questionType)
		.map((item) => item.text)[0]

	const [selectValue, setSelectValue] = useState<string>(
		title === undefined ? "Один из списка" : title
	)

	const onSelectAnserMethods = (value: string, title: string) => {
		setSelectValue(title)
		onSelectAnserMethod(value, title)
	}

	return (
		<>
			<Select
				classPrefix={classPrefix}
				titleDefault="Один из списка"
				title={selectValue}
				dataList={dataAddQuestionForms}
				setOptionTitle={onSelectAnserMethods}
			/>
		</>
	)
}
