import { useState } from "react"
import { ITransfer } from "../../../types/type"
import "./style.css"

export interface ICheckBoxForAddQuestion {
	placeholder?: string
	onChange: (value: ITransfer, index: number) => void
	onInput: (value: ITransfer, index: number) => void
	index: number
	value: boolean
	title: string
}

export const CheckBoxForAddQuestion = ({
	onChange,
	index,
	onInput,
	placeholder,
	value,
	title,
}: ICheckBoxForAddQuestion) => {
	const [isValidate, setIsValudate] = useState<boolean>(false)
	const validateHandler = (inputValue:string) =>{
		if (!inputValue.trim().length){
			setIsValudate(true)
		}
	}
	return (
		<>
		<label className="checkbox-qustion">
			<input
				className="checkbox-qustion-input"
				type="checkbox"
				onChange={(event) => {
					onChange({ value: event.target.checked, title }, index)
					
				}}
				checked={value}
			/>

			<input
				placeholder={placeholder}
				type="text"
				className="checkbox-qustion-inputText"
				value={title}
				onChange={(e) => {
					onInput({ title: e.target.value, value }, index);
					setIsValudate(false)
				}}
				onBlur={(e) => {validateHandler(e.target.value)}}
			/>
			
		</label>
		{isValidate && <span className="validateError">Поле не заполнено</span>}
		</>
	)
}
