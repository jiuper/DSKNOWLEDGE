import { useEffect, useState } from "react"
import { Button } from "../../components/atoms/Button/Button"
import { Label } from "../../components/atoms/Label/Label"
import { Tabs } from "../../components/molecules/Tabs/Tabs"
import { AddTestComponent } from "../../components/organisms/AddTestComponent/AddTestComponent"
import { addQuestionTabs } from "../../constants/links"
import { useHookDispatch, useHookSelector } from "../../store/reducers/redux"
import { tabsAction } from "../../store/reducers/tabsReducer/tabsReducer"
import { Modal } from "../../components/molecules/Modal/Modal"
import { modalAction } from "../../store/reducers/modalReduser/modalReducer"
import { QuestionDeleteModal } from "../../components/molecules/QuestionDeleteModal/QuestionDeleteModal"
import { useNavigate } from "react-router"
import { IFullTest, IQuestionState } from "../../types/type"
import { AddQuestionComponent } from "../../components/organisms/AddQuestionComponent/AddQuestionComponent"
import { fetchCreateTest } from "../../api/fetchCreateTest/fetchCreateTest"
import { ERoutes } from "../../constants/paths"
import { useParams } from "react-router-dom"
import { fetchTestById } from "../../api/FetchTestById/FetchTestById"
import { fetchEditTest } from "../../api/fetchEditTest/fetchEditTest"
import { DeleteSectionModal } from "../../components/molecules/DeleteSectionModal/DeleteSectionModal"
import { fetchDeleteTest } from "../../api/fetchDeleteTest/fetchDeleteTest"
import "./style.css"
import { useCheck } from "../../hooks/useCheck"

export const AddQuestion = () => {
	const { testList, actionPos } = useHookSelector(
		(state) => state.editCategoryReducer
	)

	const { testId } = useParams()
	const href = useNavigate()
	const dispatch = useHookDispatch()

	useEffect(() => {
		if (testId && testList !== null) {
			dispatch(fetchTestById(testId))
		}

		if (testId && testList === null) {
			href(-1)
		}
	}, [dispatch, testId])

	const payloadObj =
		testId && testList !== null
			? testList
			: {
					name: "",
					description: "",
					imageUrl: "",
					testLevel: "",
					isTestOnTime: false,
					isRandomAnswers: false,
					isRandomQuestions: false,
					timeForTest: 0,
					minThreshold: 0,
					score: 0,
					categoryId: actionPos,
					questions: [],
			  }

	const [compiteTest, setCompliteTest] = useState<IFullTest>(payloadObj)

	const getQuestion = (value: IQuestionState[]) => {
		setCompliteTest({
			...compiteTest,
			score: value.reduce((a, b) => a + b.numberOfPoints, 0),
			questions: value,
		})
	}


	
	const addQuestion = (value: IQuestionState) => {
		setCompliteTest({
			...compiteTest,
			questions: [...compiteTest.questions, value],
		})
	}

	const addTest = (title: string, value: string | boolean | number) => {
		setCompliteTest({ ...compiteTest, [title]: value })
	}

	const isSwitch = () => {
		if (
			testId &&
			compiteTest.name &&
			compiteTest.description &&
			compiteTest.testLevel !== ""
		) {
			fetchEditTest(compiteTest).then((resp) => {
				if (resp === 200) {
					href(ERoutes.adminPanel)
				}
			})
		} else if (
			compiteTest.name &&
			compiteTest.description &&
			compiteTest.testLevel !== ""
		) {
			fetchCreateTest(compiteTest).then((resp) => {
				if (resp === 200) {
					href(ERoutes.adminPanel)
				}
			})
		} else {
			alert("Пустые данные")
		}
	}

	const { isTestDelete, removeSection } = useHookSelector(
		(state) => state.modalReducer
	)
	const { selectedAddQuestion } = useHookSelector((state) => state.tabsReducer)

	const isDispatch = tabsAction.addQuestionType
	const isDelete = (value: string) => {
		fetchDeleteTest(value).then((resp) => {
			if (resp === 200) {
				href(ERoutes.adminPanel)
			}
		})
	}

	const [title, setTitle] = useState<string>("")
	const isTitle = () => {
		if (testId) {
			selectedAddQuestion === "Test"
				? setTitle("Редактирование теста")
				: setTitle("Редактирование задания")
		} else {
			selectedAddQuestion === "Test"
				? setTitle("Добавление теста")
				: setTitle("Добавление задания")
		}
	}

	useEffect(() => {
		if (testId || (!testId && selectedAddQuestion)) isTitle()
	}, [testId, selectedAddQuestion])


	const { obj, status, error, handler, blur } = useCheck(payloadObj)
	const [isCorrect, setIsCorrect] = useState<boolean>()
	useEffect(()=>{
		if(compiteTest.name.trim().length && compiteTest.questions.every(question => question.isValidate === true || question.isValidate === undefined) && compiteTest.questions.length){
			setIsCorrect(false)
		}else {
			setIsCorrect(true)
		}
	},[compiteTest])


	

	return (
		<div className="addQuestion__container addQuestion__content">
			<div className="addQuestion__all">
				<div className="addQuestion__title">
					<Label title={title} classPrefix="addQuestion__title-text" />
					<div className="addQuestion__title__buttons">
						<Button
							name="Отмена"
							classPrefix="addQuestion__title__buttons-cancel"
							handleAction={() => {
								href(ERoutes.adminPanel)
							}}
						/>
						<Button
							name={testId ? "Сохранить" : "Создать"}
							classPrefix="addQuestion__title__buttons-create"
							handleAction={isSwitch}
							disabled={isCorrect}
						/>
					</div>
				</div>
				<Tabs
					isActiveType={selectedAddQuestion}
					isDispatch={isDispatch}
					tabs={addQuestionTabs}
				/>
				{selectedAddQuestion === "Test" && (
					<AddTestComponent
						sectionState={obj}
						imageUrl={compiteTest.imageUrl}
						timeForTest={compiteTest.timeForTest}
						testLevel={compiteTest.testLevel}
						isTestOnTime={compiteTest.isTestOnTime}
						minThreshold={compiteTest.minThreshold}
						userId={testList?.id}
						validateHandler={handler}
						addTest={addTest}
						isDelete={isDelete}
						error={error}
						isBlur={(e) => blur(e,"Поля не могут быть пустыми!")}
					/>
				)}
				{selectedAddQuestion === "Question" && (
					<AddQuestionComponent
						handleQuestion={getQuestion}
						questionList={compiteTest.questions}
						addQuestion={addQuestion}
						isRandomAnswers={compiteTest.isRandomAnswers}
						isRandomQuestions={compiteTest.isRandomQuestions}
						addTest={addTest}
					/>
				)}

				{removeSection && (
					<Modal
						classPrefix="imgSelection__modal"
						isLogin={false}
						handleChanger={() => {
							dispatch(modalAction.ModalRemoveSection(false))
							document.body.style.overflow = ""
						}}>
						<DeleteSectionModal sectionTitle={""} id={""} />
					</Modal>
				)}

				{isTestDelete && (
					<Modal
						isLogin={isTestDelete}
						handleChanger={() => {
							dispatch(modalAction.ModalChangerTestDeleting(false))
							document.body.style.overflow = ""
						}}>
						<QuestionDeleteModal />
					</Modal>
				)}
			</div>
		</div>
	)
}
