import { useState } from "react"
import { emptyInput } from "../../../constants/errors"
//mport { emptyInput } from "../../../constants/errors"
import { ITransfer } from "../../../types/type"
import "./style.css"

interface IRadioForAddQuestion {
	name?: string
	placeholder: string
	onChange: (value: ITransfer) => void
	onInput: (value: ITransfer, index: number) => void
	index: number
	value: boolean
	title: string
}

export const RadioForAddQuestion = ({
	name,
	index,
	placeholder,
	onChange,
	onInput,
	value,
	title,
}: IRadioForAddQuestion) => {
	const [isValidate, setIsValudate] = useState<boolean>(false)
	const validateHandler = (event:string) =>{
		if (!event.trim().length){
			setIsValudate(true)
		}
	}
	return (
		<>
			<label>
				<input
					type="radio"
					name={name}
					className="real-radio-btn"
					onChange={(event) => {
						onChange({ value: event.target.checked, title })
					}}
					checked={value}
				/>
				<div className="custom-radio-btn"></div>
				<input
					type="text"
					value={title}
					placeholder={placeholder}
					className={`inputForRadio ${isValidate && "validateError"}`}
					onChange={(e) => {onInput({ title: e.target.value, value }, index) ; setIsValudate(false)}}
					onBlur={(e) => {validateHandler(e.target.value)}}
				/>
			</label>
			{isValidate && <span className="validateError">{emptyInput}</span>}
		</>
	)
}
