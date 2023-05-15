import { ICheckBoxValue } from "../../../types/type"
import { CheckBox } from "./CheckBox"

interface ICheckBoxGroup {

	options: ICheckBoxValue[];
	handleAction: (value:string) => void;
}

export const CheckBoxGroup = ({
																options,
																handleAction
															}: ICheckBoxGroup) => {
	return (
		<>
			{
			options.map((el,i) => <CheckBox
				name={el.name}
				key={el.value}
				value={el.value}
				label={el.label}
				handleAction={handleAction}  />)
			}
		</>
	)
}
