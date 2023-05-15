import { SelectOptionsImg } from "./SelectOptionsImg"
import "./style.css"

interface IOptions {
	text: string
	isSelect?: boolean
	level?: number
	setOptionTitle: (value: string, title: string) => void
	value?: string
	isActiveLink?: boolean
}

export const SelectOptions = ({
	text,
	level,
	setOptionTitle,
	value = "",
	isActiveLink = false,
}: IOptions) => {
	const onSelect = () => {
		setOptionTitle(value, text)
	}
	return (
		<>
			{isActiveLink && value ? (
				<a
					className="options-item link__active"
					onClick={onSelect}
					href={"#" + value}>
					{text}
				</a>
			) : (
				<div className="options-item" onClick={onSelect}>
					{}
					{level ? <SelectOptionsImg text={text} level={level} /> : text}
				</div>
			)}
		</>
	)
}
