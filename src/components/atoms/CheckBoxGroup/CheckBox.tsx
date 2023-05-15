import { useCallback } from "react"

import "./style.css"

interface ICheckBoxGroup {
	name: string;
	value: string;
	label: string;
	handleAction: (value: string) => void;
}

export const CheckBox = ({
													 name,
													 value,
													 label,
													 handleAction
												 }: ICheckBoxGroup) => {

	const onChangeFilter = useCallback(() => {
		handleAction(value)

	}, [handleAction, value])

	return (
		<div className="check-block checkbox__standart">
			<input type="checkbox" className='custom-checkbox' id={name} name={name} onClick={onChangeFilter} />
			<label className="checkbox__standart" htmlFor={name}>{label}</label>
		</div>
	)
}
