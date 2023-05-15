import "./style.css"

interface ISwitch {
	value?: string
	isTestOnTime?: boolean
	handleAction?: () => void
}

export const Switch = ({ value, handleAction, isTestOnTime = false }: ISwitch) => {
	return (
		<label className={`switch ${isTestOnTime ? "switch__active" : ""}`}>
			<input
				type="checkbox"
				checked={isTestOnTime}
				value={value}
				onChange={handleAction}
			/>
			<span className="slider round"></span>
		</label>
	)
}
