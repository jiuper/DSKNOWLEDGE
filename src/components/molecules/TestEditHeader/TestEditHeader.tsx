import { Button } from "../../atoms/Button/Button"
import { SearchAnimation } from "../../atoms/SearchAnimation/SearchAnimation"
import { Select } from "../../atoms/Select/Select"

import "./style.css"

const dataL = [
	{
		text: "Вид вопроса",
		value: "Вид вопроса"
	},
	{
		text: "Вид вопроса",
		value: "Вид вопроса"
	}
]

interface TestEditHeaderType {
	classPrefix?: string;
}

export const TestEditHeader = ({ classPrefix }: TestEditHeaderType) => {
	return (
		<div className={`${classPrefix} test-header`}>
			<Button classPrefix="test-header__button" name="Добавить вопрос" />
			<div className="test-header__control">
				<SearchAnimation onSearch={() => {
				}} search={""} />
				<Select
					classPrefix="test-header__select"
					title="Вид вопроса" dataList={dataL}
					setOptionTitle={() => {
					}}
				/>
			</div>
		</div>
	)
}
