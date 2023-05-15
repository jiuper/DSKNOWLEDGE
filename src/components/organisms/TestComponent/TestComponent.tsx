import { useCallback, useEffect, useMemo, useState } from "react"
import { dataAddQuestionForm } from "../../../constants/links"
import { useHookDispatch, useHookSelector } from "../../../store/reducers/redux"
import { selectAction } from "../../../store/reducers/SelectReduser/SelectReduser"
import { Button } from "../../atoms/Button/Button"
import { EditList } from "../../atoms/EditList/EditList"
import "./style.css"
import { SearchAnimation } from "../../atoms/SearchAnimation/SearchAnimation"
import { Select } from "../../atoms/Select/Select"
import { CreateCartEdit } from "../../molecules/CreateCartEdit/CreateCartEdit"
import { fetchAllQuestionByTestId } from "../../../api/FetchAllQuestionsByTestId/FetchAllQuestionByTestId"
import { useNavigate } from "react-router-dom"
import { tabsAction } from "../../../store/reducers/tabsReducer/tabsReducer"
import { ERoutes } from "../../../constants/paths"
import { fetchCategoryId } from "../../../api/FetchCategoryId/FetchCategoryId"
import { ILinks } from "../../../types/type"
import { BreadCrumbs } from "../../atoms/BreadCrumbs/BreadCrumbs"
export const TestComponent = () => {
	const { selectOptionTestComponent, chosenTest, testQouestion, categoryId } =
		useHookSelector((state) => ({
			selectOptionTestComponent: state.selectReducer.selectOptionTestComponent,
			chosenTest: state.testComponentReducer.chosenTest,
			testQouestion: state.testComponentReducer.testQouestion,
			categoryId: state.categoryIdReducer.categoryId,
		}))

	const dispatch = useHookDispatch()
	const href = useNavigate()

	useEffect(() => {
		if (chosenTest) dispatch(fetchAllQuestionByTestId(chosenTest.id))
	}, [dispatch, chosenTest])

	const onSelectTestComponent = useCallback(
		(value: string, title: string) => {
			dispatch(selectAction.selectOptionTestComponent({ value, title }))
		},
		[dispatch]
	)

	const [search, setSearch] = useState<string>("")

	const searchTests = useMemo(
		() =>
			search
				? testQouestion.filter((el, i) =>
						el.name.toLowerCase().includes(search)
				  )
				: testQouestion,
		[search, testQouestion]
	)

	const fil = useMemo(
		() =>
			searchTests.filter(
				(el) => el.questionType === selectOptionTestComponent.value
			),
		[search, selectOptionTestComponent]
	)

	const filterSortArr = fil.length === 0 ? searchTests : fil
	const onSearch = (value: string) => {
		setSearch(value)
	}

	const loaderTest = () => {
		if (chosenTest) {
			href(`${chosenTest.id}`)
			dispatch(tabsAction.addQuestionType("Question"))
			dispatch(fetchCategoryId(chosenTest.categoryId))
		}
	}
	const paths: ILinks[] = [
		{ href: ERoutes.adminPanel, title: categoryId.name, separator: "/" },
		{ href: "#", title: chosenTest?.name },
	]

	return (
		<section className="testComponent__container">
			<BreadCrumbs paths={paths} classPrefix="testComponent-breadCrumbs" />
			{chosenTest && (
				<CreateCartEdit
					classPrefix="testComponent__headder"
					src={chosenTest.imageUrl}
					id={chosenTest.id}
					title={chosenTest.name}
					text={chosenTest.description}
					level={chosenTest.testLevel}
					questions={chosenTest.cntQuestion}
					time={chosenTest.timeForTest}
					point={chosenTest.score}
				/>
			)}
			<div className="testComponent__QuestionSort">
				<Button
					classPrefix="testComponent__QuestionSort__button"
					name="Добавить вопрос"
					handleAction={loaderTest}
				/>
				<div className="testComponent__QuestionSort__serchAndSelect">
					<SearchAnimation onSearch={onSearch} search={search} />
					<Select
						classPrefix="testComponent__QuestionSort__serchAndSelect-select"
						titleDefault="Вид вопроса"
						title={selectOptionTestComponent.title}
						dataList={dataAddQuestionForm}
						setOptionTitle={onSelectTestComponent}
					/>
				</div>
			</div>

			<EditList dataQustions={selectOptionTestComponent.value === 'default' ? searchTests : fil} />
		</section>
	)
}
