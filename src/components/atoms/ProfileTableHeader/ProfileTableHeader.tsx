import { useState } from "react"
import { ITitleTable } from "../../../types/type"

export const ProfileTableHeader = ({ title, classPrefix }: ITitleTable) => {

	const [arrow, setArrow] = useState(false)

	return (
		<div className={classPrefix}>
			{title}
			{
				title === "Просмотр" || title === "Пройти"
					? <></>
					: <div className="arrows" onClick={() => setArrow(!arrow)}>
						<span className="line-up arrow-style"></span>
						<span className={`${arrow ? "line-downBlue" : "line-down"} arrow-style`}></span>
					</div>
			}
		</div>
	)
}
