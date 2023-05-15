import { Picture } from "../Picture/Picture"
import { SelectOptions } from "../SelectOptions/SelectOptions"
import arrow from "../../../assets/images/arrow-select.svg"
import { ISelectOptionsProps } from "../../../types/type"
import "./style.css"

interface ISelect {
	dataList: ISelectOptionsProps[]
	classPrefix?: string
	title: string
	titleDefault?: string
	isSelect?: boolean
	setOptionTitle: (value: string, title: string) => void
	isComp?: boolean
	isActiveLink?: boolean
}

export const Select = ({
	classPrefix,
	title,
	dataList,
	isSelect,
	titleDefault,
	setOptionTitle,
	isActiveLink,
}: ISelect) => {
	return (
		<div className={`${classPrefix} select`}>
			<span>{title}</span>
			<Picture src={arrow} alt="arrow" />
			<div className="select__wrapper">
				{dataList.length ? (
					dataList.map((item, i) => (
						<SelectOptions
							key={i}
							value={item.value}
							text={item.text}
							level={item.level}
							isSelect={isSelect}
							setOptionTitle={setOptionTitle}
							isActiveLink={isActiveLink}
						/>
					))
				) : (
					<span className="select__empty">У вас нет заданий в этом тесте</span>
				)}
			</div>
		</div>
	)
}
