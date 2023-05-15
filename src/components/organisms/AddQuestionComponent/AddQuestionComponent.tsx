import { Switch } from "../../atoms/Switch/Switch"
import { AddGroupQuestion } from "../AddGroupQestion/AddGroupQuestion"
import { IQuestionState } from "../../../types/type"
import { Button } from "../../atoms/Button/Button"
import "../AddGroupQestion/style.css"
import { Select } from "../../atoms/Select/Select"
import { useHookDispatch, useHookSelector } from "../../../store/reducers/redux"
import { selectAction } from "../../../store/reducers/SelectReduser/SelectReduser"
import { useCallback, useEffect} from "react"

interface IAddQuestionComponent {
	handleQuestion: (value: IQuestionState[]) => void
	questionList: IQuestionState[]
	isRandomQuestions: boolean
	isRandomAnswers: boolean
	addQuestion: (value: IQuestionState) => void
	addTest: (title: string, value: string | boolean | number) => void
}

export const AddQuestionComponent = ({
	isRandomQuestions,
	isRandomAnswers,
	addQuestion,
	handleQuestion,
	questionList,
	addTest,
}: IAddQuestionComponent) => {
	const { selectAdminTask } = useHookSelector((state) => state.selectReducer)

	const dispatch = useHookDispatch()
	const onChangeQuestion = () => {
		addQuestion({
			id: null,
			name: "",
			iconUrl: "",
			questionType: "OneOfMany",
			numberOfPoints: 0,
			answers: [],
			trueAnswers: [],
			isValidate:false
		})
	}

	const onSelectAdminTask = useCallback(
		(value: string, title: string) => {
			dispatch(selectAction.selectAdminTask({ value, title }))
		},
		[dispatch]
	)

	useEffect(() => {
		if (questionList)
			dispatch(selectAction.selectAdminTask({ title: "Задания", value: "" }))
	}, [questionList])

	return (
		<section className="addQuestionComponent__container">
			<div className="addQuestionComponent__toggles">
				<div className="addQuestionComponent__toggle">
					<div className="addQuestionComponent__box">
						<Switch
							isTestOnTime={isRandomQuestions}
							handleAction={() =>
								addTest("isRandomQuestions", !isRandomQuestions)
							}
						/>
						<span>Cлучайный порядок задания</span>
					</div>
					<div className="addQuestionComponent__box">
						<Switch
							isTestOnTime={isRandomAnswers}
							handleAction={() => addTest("isRandomAnswers", !isRandomAnswers)}
						/>
						<span>Cлучайный порядок ответов</span>
					</div>
				</div>
				<Select
					classPrefix="select__anchor"
					dataList={questionList.map((el, i) => ({
						text: el.name ? i + 1 + ". " + el.name : "",
						value: el.name ? el.name : "",
					}))}
					title={
						selectAdminTask.title !== "" ? selectAdminTask.title : "Задания"
					}
					setOptionTitle={onSelectAdminTask}
					isActiveLink={true}
				/>
			</div>
			<div className="addQuestionComponent__action">
				<div className="addQuestionComponent__box">
					<Button
						name="+"
						classPrefix="addQuestionComponent__button"
						handleAction={onChangeQuestion}
					/>
					<span>Добавить задание</span>
				</div>
			</div>

			<AddGroupQuestion
				handleQuestion={handleQuestion}
				questionList={questionList}
				addQuestion={addQuestion}
			/>
		</section>
	)
}
