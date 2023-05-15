import "./style.css"

interface ICheckBoxQustion {
	title: string;
	onChange: (val: string) => void
}

export const CheckBoxQustion = ({ title, onChange }: ICheckBoxQustion) => {

	return (
		<label className="checkbox-qustion">
			<input
				className="checkbox-qustion-input"
				type="checkbox"
				onChange={(e) => {onChange(title)}}
			/>
			<div className="checkbox-qustion-text">{title}</div>
		</label>
	)
}
