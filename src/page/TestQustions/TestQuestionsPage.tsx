import { TestQustionGroup } from "../../components/molecules/TestQustionGroup/TestQustionGroup"
import { Picture } from "../../components/atoms/Picture/Picture"
import { ITestQuestionsData } from "../../types/type"
import defaultAvatar from "../../assets/images/user-male.svg"

interface ITestQuestionsPage {
	filterTestQuestion: ITestQuestionsData
	onChange: (val: string) => void
	length: number
	onButtonAction: (type: string) => void
	onInput: (val: string) => void
	nextQuest: number
	skipQuest: boolean
	finishTest: boolean
}

export const TestQuestionsPage = ({
	nextQuest,
	onButtonAction,
	filterTestQuestion,
	onChange,
	onInput,
	length,
	skipQuest,
	finishTest,
}: ITestQuestionsPage) => {
	return (
		<>
			{
				<div className="testQustion__content">
					<TestQustionGroup
						key={filterTestQuestion.id}
						questionNum={nextQuest + 1}
						question={filterTestQuestion.name}
						answers={filterTestQuestion.answers}
						questionType={filterTestQuestion.questionType}
						length={length}
						onChange={onChange}
						onInput={onInput}
						onButtonAction={onButtonAction}
						skipQuest={skipQuest}
						finishTest={finishTest}
					/>
					<div className="testQustion__wrap_img">
						<Picture
							classPrefix="testQustion__img"
							src={filterTestQuestion.iconUrl || defaultAvatar}
						/>
					</div>
				</div>
			}
		</>
	)
}
