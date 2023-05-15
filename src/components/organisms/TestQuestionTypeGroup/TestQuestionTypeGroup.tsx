import { CheckBoxQustion } from "../../atoms/CheckBoxQustion/CheckBoxQustion"
import { TextField } from "../../atoms/TextField/TextField"
import { useState } from "react"

interface ITestQuestionTypeGroup {
	answers: string[];
	questionType: string,
	onChange: (val: string) => void
	onInput: (val: string) => void
}

export const TestQuestionTypeGroup = ({
	questionType,
	answers,
	onChange,
	onInput
}: ITestQuestionTypeGroup) => {

	const [value, setValue] = useState<string>("")
	const onChanges = (values: string) => {
		setValue(values)
		onInput(values)
	}

	return (
		<>
			{
				questionType === "ManyOfMany" &&
				<>
				<span className="qustionGroup__subtitle">Выберите подходящий ответ из списка:</span>
				<ul className="qustionGroup__test">
					{answers.map((item, i) =>
						<CheckBoxQustion
							onChange={onChange}
							key={i}
							title={item}
						/>)}
				</ul>
				</>
			}
			{
				questionType === "OneOfMany" &&
				<>
				<span className="qustionGroup__subtitle">Выберите подходящий ответ из списка:</span>
				{answers.map(el =>
					<div className="qustionGroup-radioGroup" key={el}>
						<label className="qustionGroup-radioGroup-text" key={el}>
						<input
						className="real-radio-btn"
							name="name"
							type="radio"
							onChange={() => {
								onChanges(el)
							}}
						/>
						<div className="custom-radio-btn"></div>
							<span className="qustionGroup-radioGroup-Questiontext">{el}</span>
						</label>
					</div>
				)}
				</>

			}
			{
				questionType === "InputText" &&
				<>
				<span className="qustionGroup__subtitle">Введите правильный ответ:</span>
				<TextField
					classPrefix="field"
					value={value}
					placeholder="Введите ответ"
					handleChange={(e) => {
						onChanges(e.target.value)
					}}
				/>
				</>
			}
		</>
	)
}
