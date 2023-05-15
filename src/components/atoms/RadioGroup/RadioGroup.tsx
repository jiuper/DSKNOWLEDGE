import { Radio } from "./Radio"
import { IRadio } from "../../../types/type"


interface IRadioGroup {
	classPrefix: string,
	textClass?: string,
	testLevel:string
	addTest: (title: string, value: string | boolean | number) => void
}

export const RadioGroup = ({ classPrefix, textClass, addTest,testLevel }: IRadioGroup) => {

	const radioList: IRadio[] = [
		{
			value: 'Preparatory',
			name: "difficultyLevel",
			marker: "firstPosition",
			label: "Подготовительный"
		},
		{
			value: 'Middle',
			name: "difficultyLevel",
			marker: "secondPosition",
			label: "Средний"
		},
		{
			value: 'High',
			name: "difficultyLevel",
			marker: "thirdPosition",
			label: "Высокий"
		}

	]

	return (
			<div className={classPrefix}>
				{
					radioList.map(el => (
						<Radio
							testLevel={testLevel}
							key={el.value}
							value={el.value}
							name={el.name}
							marker={el.marker}
							label={el.label}
							textClass={textClass}
							addTest={addTest}
						/>
					))
				}
			</div>
	)
}
