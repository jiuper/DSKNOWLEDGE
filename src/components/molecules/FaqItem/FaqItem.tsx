import { Label } from "../../atoms/Label/Label"
import { IconButton } from "../../atoms/IconButton/IconButton"
import { useState } from "react"
import arrow_up from "../../../assets/images/arrow_back_ios_up.svg"
import arrow_down from "../../../assets/images/arrow_back_ios_down.svg"
import { IFaQuestion } from "../../../types/type"
import "./style.css"

export const FaqItem = (
	{
		answer,
		question,
	}: IFaQuestion) => {

	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handleId = () => {
		setIsOpen(!isOpen)
	}

	return (
		<>
			<div className="item__feedback">
				<div className="item__title" onClick={handleId}>
					<Label
						title={question}
						classPrefix={`${"label__feedback"} ${isOpen ? "label-color-blue" : "label-color-black"}`}
					/>
					<IconButton
						disabled={false}
						classPrefix="item__button"
						icon={isOpen ? arrow_up : arrow_down} />
				</div>
				<div className={`${isOpen ? "arrow_up" : "arrow_down"}`}>
					<p className="item__description">{answer}</p>
				</div>
			</div>
		</>
	)
}






