import { Column } from "@ant-design/plots"
import { Select } from "../Select/Select"
import { dataListsMonths, dataListsYears } from "../../../constants/links"
import { useHookDispatch, useHookSelector } from "../../../store/reducers/redux"
import { useCallback, useEffect, useState } from "react"
import { selectAction } from "../../../store/reducers/SelectReduser/SelectReduser"
import { IGetStatistic, IProgressBar } from "../../../types/type"
import { fetchGetStatistic } from "../../../api/FetchGetStatistic/fetchGetStatistic"

import "./style.css"
import { useParams } from "react-router"

export const ProgressCard = () => {

	const yearArr = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"]
	
	const {
		selectOptionProgressMiddle,
		selectOptionProgressSmall,
		statistic,
	} = useHookSelector(state => ({
		selectOptionProgressMiddle: state.selectReducer.selectOptionProgressMiddle,
		selectOptionProgressSmall: state.selectReducer.selectOptionProgressSmall,
		statistic: state.resultTestReduser.statistic,
	}))
	const userId = useParams()
	const dispatch = useHookDispatch()
	const [data, setData] = useState<IProgressBar[]>([])
	const [getStatistic, setGetStatistic] = useState<IGetStatistic>({
		userId: userId.id ?? "",
		month: 0,
		year: 2023
	})

	useEffect(() => {
		if (userId) {
			dispatch(fetchGetStatistic(getStatistic))
		}
	}, [dispatch, getStatistic])

	const onSelectTitleLevel = useCallback((value: string) => {
		dispatch(selectAction.selectOptionProgressSmall(value))
		setData([])
		setGetStatistic({ ...getStatistic, year: +value })
	}, [dispatch, getStatistic])

	const onSelectTitleLevelChoice = useCallback((value: string, title: string) => {
		dispatch(selectAction.selectOptionProgressMiddle({ value, title }))
		setData([])
		setGetStatistic({ ...getStatistic, month: +value })
	}, [dispatch, getStatistic])
	
	useEffect(() => {
		statistic.forEach((el, i) => {
			if (getStatistic.month !== 0) {
				setData([...data, data[i] = {
					type: `${i + 1}`,
					averageScore: el.averageScore,
					countPassedTest: el.countPassedTest,
				}])
			} else {
				setData([...data, data[i] = {
					type: `${yearArr[i]}`,
					averageScore: el.averageScore,
					countPassedTest: el.countPassedTest,
				}])
			}
		})

	}, [statistic])


	const config = {
		data,
		xField: "type",
		yField: "averageScore",
		yAxis: {
			max: 10,
			tickInterval: 2
		},
		minColumnWidth: 10,
		maxColumnWidth: 48,
		columnStyle: {
			fill: "l(270) 0:#5183f430 1:#5488ff33"
		},
		tooltip: {
			formatter: (datum: any) => ({
				name: `Средний бал: `,
				value: datum.averageScore,
			}),

		},
	}

	return (
		<div className="progress-card">
			<div className="progree-card__header">
				<Select classPrefix="progree-card__date progress-card__select"
					title={selectOptionProgressMiddle.title}
					dataList={dataListsMonths}
					setOptionTitle={onSelectTitleLevelChoice} />
				<Select classPrefix="progree-card__year progress-card__select"
					title={selectOptionProgressSmall}
					dataList={dataListsYears}
					setOptionTitle={onSelectTitleLevel} />
			</div>
			<div className="progree-card__main">
				<div className="progree-card__description">
					<h6 className="progree-card__title">Моя успеваемость</h6>
					<p className="progree-card__text">
						Здесь вы можете наблюдать сведения текущей успеваемости по учебному плану,
						проставляемой в электронных журналах преподавателем либо вами.
					</p>
				</div>
				<div className="progree-card__content">
					<Column {...config} />
				</div>
			</div>
		</div>
	)
}



