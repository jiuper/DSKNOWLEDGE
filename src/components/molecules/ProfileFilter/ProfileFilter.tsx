import { useCallback, useEffect, useState } from "react"
import { Label } from "../../atoms/Label/Label"
import { CheckBoxGroup } from "../../atoms/CheckBoxGroup/CheckBoxGroup"
import { resultTestsStatus, resultTestsYers } from "../../../constants/links"
import { TextField } from "../../atoms/TextField/TextField"
import { filterFil, IFilterParams } from "../../../types/type"
import { useHookDispatch, useHookSelector } from "../../../store/reducers/redux"
import { fetchCatalogTest } from "../../../api/FetchCatalogTest/FetchCatalogTest"

interface IProfileFilter {
	onFilterChange: (value: IFilterParams) => void
}

export const ProfileFilter = ({ onFilterChange }: IProfileFilter) => {

	const [fil, setFil] = useState<IFilterParams>({
		status: [],
		year: [],
		category: [],
		scoreFrom: "",
		yearTo: "",
		scoreTo: "",
		yearFrom: ""
	})
	const { testLists } = useHookSelector(state => state.catalogTestReducer)
	const dispatch = useHookDispatch()

	useEffect(() => {
		dispatch(fetchCatalogTest())
	}, [dispatch])

	const onChangeFilter = useCallback((target: filterFil, value: string) => {
		const test = fil[target]

		if (typeof test !== "object") return

		if (test.includes(value)) {
			setFil({ ...fil, [target]: [...test.filter(test => test !== value)] })
		} else {
			setFil({ ...fil, [target]: [...test, value] })
		}
	}, [fil])

	useEffect(() => {
		onFilterChange(fil)
	}, [fil, onFilterChange])

	return (
		<div className="resultsFilter">
			<div className="resultsFilter__section">
				<Label
					title="Раздел"
					classPrefix="label"
				/>
				<CheckBoxGroup
					options={testLists.map((el, i) => ({ label: el.name, value: el.name, name: el.name + i }))}
					handleAction={(value: string) => {
						onChangeFilter(filterFil.category, value)
					}}
				/>
			</div>
			<div className="resultsFilter__status">
				<Label
					title="Статус"
					classPrefix="label"
				/>
				<CheckBoxGroup
					options={resultTestsStatus}
					handleAction={(value: string) => {
						onChangeFilter(filterFil.status, value)
					}}
				/>
			</div>
			<div className="resultsFilter__score">
				<Label
					title="Баллы"
					classPrefix="label"
				/>
				<div className="resultsFilter__score_textField">
					<span className='result__line'></span>
					<TextField
						placeholder="от 0.0"
						classPrefix="resultsFilter__textField "
						value={fil[filterFil.scoreFrom]}
						disabled={false}
						maxLength={3}
						handleChange={(e) => {
							setFil({ ...fil, scoreFrom: e.target.value })
							onChangeFilter(filterFil.scoreFrom, fil[filterFil.yearFrom])
						}}
					/>
					<TextField
						placeholder="до 10"
						classPrefix="resultsFilter__textField "
						value={fil[filterFil.scoreTo]}
						disabled={false}
						maxLength={3}
						handleChange={(e) => {
							setFil({ ...fil, scoreTo: e.target.value })
							onChangeFilter(filterFil.scoreTo, fil[filterFil.scoreTo])
						}}
					/>
				</div>
			</div>
			<div className="resultsFilter__years">
				<Label
					title="Год"
					classPrefix="label"
				/>
				<CheckBoxGroup
					options={resultTestsYers}
					handleAction={(value: string) => {
						onChangeFilter(filterFil.year, value)
					}}
				/>
				{/* TODO: the functionality will be further refined in the future */}
				{/* <div className="resultsFilter__score_textField">
					<span className='result__line'></span>
					<TextField
						placeholder="от 2020"
						classPrefix="resultsFilter__textField"
						value={fil[filterFil.yearFrom]}
						disabled={false}
						maxLength={4}
						handleChange={(e) => {
							setFil({ ...fil, yearFrom: e.target.value })
							onChangeFilter(filterFil.yearFrom, fil[filterFil.yearFrom])
						}}
					/>
					<TextField
						placeholder="до 2022"
						classPrefix="resultsFilter__textField"
						value={fil[filterFil.yearTo]}
						disabled={false}
						maxLength={4}
						handleChange={(e) => {
							setFil({ ...fil, yearTo: e.target.value })
							onChangeFilter(filterFil.yearFrom, fil[filterFil.yearTo])
						}}
					/>
				</div> */}
			</div>
		</div>
	)
}

