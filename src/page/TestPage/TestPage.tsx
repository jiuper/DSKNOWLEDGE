import { BreadCrumbs } from "../../components/atoms/BreadCrumbs/BreadCrumbs"
import { Select } from "../../components/atoms/Select/Select"
import { Footer } from "../../components/template/Footer/Footer"
import { Header } from "../../components/template/Header/Header"
import { breadCrumbs } from "../../constants/paths"
import { TestCategoryLists } from "../../components/organisms/TestCategoryLists/TestCategoryLists"
import { dataOptions } from "../../constants/links"
import { useHookDispatch, useHookSelector } from "../../store/reducers/redux"
import { useCallback, useEffect, useState } from "react"
import { selectAction } from "../../store/reducers/SelectReduser/SelectReduser"
import { useLocation } from "react-router-dom"
import { fetchCatalogTest } from "../../api/FetchCatalogTest/FetchCatalogTest"
import { ICatalogTestPage } from "../../types/type"
import { SkeletonCategoryTestCard } from "../../components/organisms/SkeletonCategoryTestCard/SkeletonCategoryTestCard"
import { sortSelect } from "../../function/selectActions/selectActions"

import "./style.css"

export const TestPage = () => {

	const { pathname } = useLocation()

	const dispatch = useHookDispatch()

	const onSelectTitle = useCallback((value: string, title: string) => {
		dispatch(selectAction.selectOptionCatalogPage({ value, title }))
	}, [dispatch])

	const {
		selectOptionCatalogPage,
		testLists,
		isLoading
	} = useHookSelector(state => ({
		selectOptionCatalogPage: state.selectReducer.selectOptionCatalogPage,
		testLists: state.catalogTestReducer.testLists,
		isLoading: state.catalogTestReducer.isLoading,
	}))

	const [testListsSort, setTestListsSort] = useState<ICatalogTestPage[]>()

	const arrSkeleton = Array(4).fill("")

	useEffect(() => {
		sortSelect({
			selectedField: selectOptionCatalogPage.title,
			dataForSorting: [...testLists],
			setFn: setTestListsSort
		})
	}, [selectOptionCatalogPage, testLists])


	useEffect(() => {
		dispatch(fetchCatalogTest())
	}, [dispatch])

	return (
		<>
			<Header />
			<section className="tests container">
				<BreadCrumbs paths={breadCrumbs[pathname.split("/")[1]]} />
				<div className="tests__header">
					<h4 className="tests__title">Каталог тестов</h4>
					<Select
						setOptionTitle={onSelectTitle}
						classPrefix="test__select"
						title={selectOptionCatalogPage.title}
						dataList={dataOptions}
					/>
				</div>

				<div className="tests__cards">
					{
						!isLoading && testListsSort ? 
							testListsSort.length ?
								<TestCategoryLists test={testListsSort} /> :
								<span className="emptiness">В каталоге нет тестов :<code>(</code></span> :
							arrSkeleton.map((el, i) => <SkeletonCategoryTestCard key={i} />)
					}
				</div>
			</section>
			<Footer />
		</>
	)
}