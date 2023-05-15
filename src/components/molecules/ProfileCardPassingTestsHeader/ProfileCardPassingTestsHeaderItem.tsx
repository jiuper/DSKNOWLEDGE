import { useState } from "react"

interface IProfileCardPassingTestsHeaderItem {
	title: string
	isArrow?: boolean
	classPrefix: string
}

export const ProfileCardPassingTestsHeaderItem = ({
																										title,
																										isArrow = true,
																										classPrefix
																									}: IProfileCardPassingTestsHeaderItem) => {

	const [arrow, setArrow] = useState(false)

	return (
		<div className={classPrefix}>
			<span>{title}</span>
			{
				isArrow ?
					<div className="arrows" onClick={() => setArrow(!arrow)}>
						<span className="line-up arrow-style"></span>
						<span className={`${arrow ? "line-downBlue" : "line-down"} arrow-style`}></span>
					</div>
					: <></>
			}
		</div>
	)
}

