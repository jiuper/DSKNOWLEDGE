import "./style.css"

interface IRadioItems {
	value: string
	name: string
	marker: string
	label: string
	textClass?: string
	testLevel: string
	placeholder?: number
	addTest: (title: string, value: string | boolean | number) => void
}

export const Radio = ({ value, name, marker, label, textClass, addTest, testLevel }: IRadioItems) => {
	return (
		<>
			<label htmlFor={marker} className={textClass}>
				<input
					type="radio"
					id={marker}
					name={name}
					onChange={() => addTest("testLevel", value)}
					className="real-radio-btn"
					value={value}
					checked={testLevel === value}
				/>
				<span className="custom-radio-btn"></span>
				{label}
			</label>
		</>
	)
}
