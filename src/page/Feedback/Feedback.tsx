import { BreadCrumbs } from "../../components/atoms/BreadCrumbs/BreadCrumbs"
import { breadCrumbs } from "../../constants/paths"
import { Footer } from "../../components/template/Footer/Footer"
import { Header } from "../../components/template/Header/Header"
import { FaqLists } from "../../components/molecules/FaqItem/FaqLists"
import { Tabs } from "../../components/molecules/Tabs/Tabs"
import { tabs } from "../../constants/links"
import { useHookDispatch, useHookSelector } from "../../store/reducers/redux"
import { useEffect, useMemo } from "react"
import { useLocation } from "react-router-dom"
import { tabsAction } from "../../store/reducers/tabsReducer/tabsReducer"
import { FetchApiFaq } from "../../store/reducers/FaqReducer/FetchApi"

import "./style.css"

export const Feedback = () => {
	const { pathname } = useLocation()
	const dispatch = useHookDispatch()

	useEffect(() => {
		dispatch(FetchApiFaq())
	}, [dispatch])

	const { faq } = useHookSelector((state) => state.faqReducer)

	const { selectedType } = useHookSelector((state) => state.tabsReducer)
	const isDispatch = tabsAction.selectedType
	const filterLists = useMemo(
		() => faq.filter((el) => el.category === selectedType),
		[selectedType, faq]
	)

	return (
		<>
			<Header />
			<div className="container">
				<BreadCrumbs paths={breadCrumbs[pathname.split("/")[1]]} />
				<Tabs isActiveType={selectedType} isDispatch={isDispatch} tabs={tabs} />
				{
					<div className="faq__wrapper">
						<FaqLists faqItems={filterLists} />
					</div>
				}
			</div>
			<Footer />
		</>
	)
}
