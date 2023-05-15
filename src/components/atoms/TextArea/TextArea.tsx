import React from "react"

interface ITextArea {
	placeholder?: string;
	classPrefix?: string;
	value: string | undefined;
	disabled?: boolean;
	handleChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	isBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = ({
	placeholder,
	classPrefix,
	value,
	disabled,
	handleChange,
	isBlur,
}: ITextArea) => {
	return (
		<textarea
			placeholder={placeholder}
			className={classPrefix}
			value={value}
			disabled={disabled}
			onChange={handleChange}
			onBlur={isBlur}
		/>
	)
}
