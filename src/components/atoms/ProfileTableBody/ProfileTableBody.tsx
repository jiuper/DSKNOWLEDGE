import { Link } from "../Link/Link"
import { ProgressCircle } from "../ProgressCircle/ProgressCircle"

import "./style.css"

interface IProfileTableBody {
	classPrefix: string
	classPrefixItem: string
	date: string
	nameCatalog: string
	nameTest: string
	time?: string
	countQue?: number
	progress: number
	status: string
	replace: string
	href: string
}

export const ProfileTableBody = ({
	date,
	nameCatalog,
	nameTest,
	time,
	countQue,
	progress,
	status,
	replace,
	classPrefix,
	classPrefixItem,
	href,
}: IProfileTableBody) => {
	return (
		<div className={`${classPrefix} test__item`}>
			<span className="item-80"> {date}</span>
			<div className="item-190 fl-column">
				<span>{nameCatalog}</span>
				<span>{nameTest}</span>
			</div>
			<div className="item-80">{time}</div>
			<div className="item-190">{countQue}</div>
			<div className="item-190">
				<ProgressCircle progress={+progress.toFixed(1)} />
			</div>
			<span
				className={`test__state item-80 ${
					status === "просрочен" || status === "пересдача" ? "red" : ""
				}`}>
				{status}
			</span>
			<Link classPrefix="item-80 item-link" href={href} title={replace}></Link>
		</div>
	)
}
