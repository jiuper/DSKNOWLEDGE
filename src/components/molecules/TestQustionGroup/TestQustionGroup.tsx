import { Button } from "../../atoms/Button/Button"
import "./style.css"
import { TestQuestionTypeGroup } from "../../organisms/TestQuestionTypeGroup/TestQuestionTypeGroup"

interface TestQustionGroupTypes {
	questionNum: number
	question: string
	answers: string[]
	questionType: string
	length: number
	onChange: (val: string) => void
	onButtonAction: (type: string) => void
	onInput: (val: string) => void
	skipQuest: boolean
	finishTest: boolean
}

export const TestQustionGroup = ({
	questionNum,
	question,
	answers,
	length,
	onChange,
	questionType,
	onInput,
	onButtonAction,
	skipQuest,
	finishTest,
}: TestQustionGroupTypes) => {
	return (
		<div className="qustionGroup">
			<h2 className="qustionGroup__title">
				{questionNum}. {question}
			</h2>
			<TestQuestionTypeGroup
				questionType={questionType}
				answers={answers}
				onInput={onInput}
				onChange={onChange}
			/>
			{!finishTest ? (
				<div className="qustionGroup__buttons">
					<Button
						classPrefix={
							length - 1 === questionNum - 1
								? "hidden"
								: "qustionGroup__button-left"
						}
						name="Пропустить вопрос"
						handleAction={
							!skipQuest
								? () => onButtonAction("onSkippQuest")
								: () => onButtonAction("onSkipFilterQuest")
						}
					/>
					{skipQuest && (
						<Button
							classPrefix={
								length - 1 === questionNum - 1
									? "qustionGroup__button-left"
									: "hidden"
							}
							name="Перейти к вопросу"
							handleAction={() => onButtonAction("onSkipFilterQuest")}
						/>
					)}
					<Button
						classPrefix="qustionGroup__button-right"
						name={
							length - 1 === questionNum - 1
								? "Завершить тест"
								: "Ответить на вопрос"
						}
						handleAction={() => onButtonAction("onNextQuest")}
					/>
				</div>
			) : (
				<Button
					classPrefix="qustionGroup__button-right"
					name="Завершить тест"
					handleAction={() => onButtonAction("onNextQuest")}
				/>
			)}
		</div>
	)
}
