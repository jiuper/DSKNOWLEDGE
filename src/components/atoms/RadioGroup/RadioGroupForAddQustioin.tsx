import { useEffect, useState } from "react"
import { checkCorrectAnswer } from "../../../constants/errors"
import { ITransfer } from "../../../types/type"
import { RadioForAddQuestion } from "./RadioForAddQuestion"

interface IRadioGroupForAddQustioin {
	items: string[]
	itemsTrue: (string | null)[]
	classPrefix: string
	name: string
	isValidate: boolean
	onChange: (value: ITransfer) => void
	onInput: (value: ITransfer, index: number) => void
}

export const RadioGroupForAddQustioin = ({
	items,
	classPrefix,
	name,
	onChange,
	onInput,
	itemsTrue,
}: IRadioGroupForAddQustioin) => {
	const arr = items.map((el) => ({ title: el, value: itemsTrue.includes(el) }))
	const [isValidate, setIsValidate] = useState<boolean>(false)
	
	useEffect(()=>{
		if(!itemsTrue.length && items.length > 1){
			setIsValidate(true)
		}else setIsValidate(false)
	},[isValidate,onInput])
	
	
	return (
		<>
			<div className={classPrefix}>
				{arr.map((el, i) => (
					<RadioForAddQuestion
						key={i}
						name={name}
						index={i}
						title={el.title}
						value={el.value}
						placeholder={`Вариант ${i + 1}`}
						onChange={onChange}
						onInput={onInput}
					/>
				))}
			</div>
			{isValidate && <span className="validateError">{checkCorrectAnswer}</span>}
		</>
	)
}
