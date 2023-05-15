import "./TextField.css"

interface ITextField {
	placeholder?: string
	name?: string
	classPrefix?: string
	value?: string | undefined
	disabled?: boolean
	type?: string
	error?: string
	maxLength?: number | undefined
	isBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
	handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	id?: string
}

export const TextField = ({
	placeholder,
	name,
	classPrefix,
	value,
	handleChange,
	disabled,
	isBlur,
	error = "",
	type = "text",
	maxLength,
	id,
}: ITextField) => {
	return (
		<>
			<input
				type={type}
				step={0.1}
				placeholder={placeholder}
				className={`${classPrefix} ${error ? "error" : ""} field`}
				value={value}
				name={name}
				disabled={disabled}
				onBlur={isBlur}
				onChange={handleChange}
				maxLength={maxLength}
				id={id}
				/>
				{error ? <span className="input-error">{error}</span> : ""}
		</>
	)
}
