import { useHookDispatch, useHookSelector } from "../../../store/reducers/redux"
import { Button } from "../../atoms/Button/Button"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { ERoutes } from "../../../constants/paths"
import { CategoryIdSlise } from "../../../store/reducers/CategoryIdReducer/CategoryIdReducer"
import { fetchTestsList } from "../../../api/FetchTestsList/FetchTestsList"
import { fetchCategoryId } from "../../../api/FetchCategoryId/FetchCategoryId"
import { fetchCatalogTest } from "../../../api/FetchCatalogTest/FetchCatalogTest"
import { editCategoryAction } from "../../../store/reducers/EditCategoryEdit/EditCategoryEdit"

import "./style.css"

export const SectionNavigation = () => {

	const dispatch = useHookDispatch()
	const href = useNavigate()

	const { allCatalog, actionPos } = useHookSelector(state => state.editCategoryReducer)

	const handleClickRoute = (name: string) => {
		dispatch(CategoryIdSlise.actions.getButtonName(name))
		href(ERoutes.createSection)
	}

	useEffect(() => {
		dispatch(fetchCatalogTest())
	}, [dispatch])

	const fetchQuery = (value: string) => {
		dispatch(editCategoryAction.selectCategory(value))
		dispatch(fetchCategoryId(value))
		dispatch(fetchTestsList(value))
	}

	return (
		<section className="sectionNavigation">
			<ul className="sectionNavigation__links">
				{
					allCatalog.map(ctName => (
						<li
							key={ctName.id}
							onClick={() => {
								fetchQuery(ctName.id)
							}}
							className={`sectionNavigation__link
								${(actionPos ?
									actionPos === ctName.id :
									allCatalog.map(el => el.id)[0] === ctName.id)
									? "sectionNavigation__link_active"
									: ""} `}
						>
							<div>{ctName.name}</div>
						</li>
					))
				}
			</ul>

			<div className="sectionNavigation-a">
				<Button
					name="+"
					classPrefix="sectionNavigation__addButton"
					handleAction={() => handleClickRoute("+")}
				/>
			</div>
		</section>
	)
}
