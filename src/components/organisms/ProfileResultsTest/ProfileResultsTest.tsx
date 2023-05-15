import { titleStoryTest } from "../../../constants/links"
import { ProfileTestCard } from "../../molecules/ProfileTestCard/ProfileTestCard"
import { ProfileFilter } from "../../molecules/ProfileFilter/ProfileFilter"
import { useCallback, useEffect, useMemo, useState } from "react"
import { filterFil, IFilterParams } from "../../../types/type"
import { useHookDispatch, useHookSelector } from "../../../store/reducers/redux"
import { useParams } from "react-router"
import { fetchGetAllResultByUser } from "../../../api/fetchGetAllResultByUserId/fetchGetAllResultByUseId"

import "./style.css"

export const ProfileResultsTest = () => {
	const dispatch = useHookDispatch()
	const { id } = useParams()
	const { allResultByUser } = useHookSelector(
		(state) => state.resultTestReduser
	)

	useEffect(() => {
		if (id !== undefined) {
			dispatch(fetchGetAllResultByUser(id))
		}
	}, [dispatch, id])

	const [fil, setFil] = useState<IFilterParams>({
		status: [],
		year: [],
		category: [],
		scoreFrom: "",
		yearTo: "",
		scoreTo: "",
		yearFrom: "",
	})

	const onFilterChange = useCallback((value: IFilterParams) => {
		setFil(value)
	}, [])


	const resultsTestsDataFilter = useMemo(() =>
		allResultByUser.filter(el =>
			(fil[filterFil.category].length ? fil[filterFil.category].includes(el.categoryName) : true)
			&&
			(fil[filterFil.status].length ? fil[filterFil.status].includes(el.status.toLowerCase()) : true)
			&&
			(fil[filterFil.scoreFrom].length ? +fil[filterFil.scoreFrom] <= el.score : true)
			&&
			(fil[filterFil.scoreTo].length ? +fil[filterFil.scoreTo] >= el.score : true)
			&&
			(fil[filterFil.year].length ? fil[filterFil.year].some(str => str.slice(2) === el.dateOfPassage.slice(6)) : true)
			&&
			(fil[filterFil.yearFrom].length ? fil[filterFil.yearFrom].slice(2) <= el.dateOfPassage.slice(6) : true)
			&&
			(fil[filterFil.yearTo].length ? fil[filterFil.yearTo].slice(2) >= el.dateOfPassage.slice(6) : true)
		), [allResultByUser, fil])

	return (
		<div className="result">
			<ProfileFilter onFilterChange={onFilterChange} />
			<div className="resultBody">
				{resultsTestsDataFilter && (
					<ProfileTestCard
						titleTable={titleStoryTest}
						infoTest={resultsTestsDataFilter}
					/>
				)}
			</div>
		</div>
	)
}
