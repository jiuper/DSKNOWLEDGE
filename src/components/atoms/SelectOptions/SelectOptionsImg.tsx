import { Picture } from "../../atoms/Picture/Picture"
import puzzle from "../../../assets/images/puzzle-icon.svg"

import "./style.css"

interface SelectOptionsImgType {
	text: string
	level?: number
}

export const SelectOptionsImg = ({ text, level }: SelectOptionsImgType) => {
	return (
		<div className="options-item__img">
			{text}
			<div>
				{level}
				<Picture src={puzzle}></Picture>
			</div>
		</div>
	)
}
