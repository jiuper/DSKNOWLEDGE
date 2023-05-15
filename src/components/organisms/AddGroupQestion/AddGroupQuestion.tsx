import { AddQuestionForm } from "../AddQuestionForm/AddQuestionForm"
import { IQuestionState } from "../../../types/type"
import defaultTestPicture from "../../../assets/images/defaultTestPicture.png"

import "./style.css"

interface IAddGroupQuestion {
	handleQuestion: (value: IQuestionState[]) => void
	questionList: IQuestionState[]
	addQuestion: (value: IQuestionState) => void
}

export const AddGroupQuestion = ({ handleQuestion, questionList, addQuestion }: IAddGroupQuestion) => {

	const handleOnChange = (value: IQuestionState, index: number) => {
		const payLoad = questionList.map((el, i) => i === index ? value : el)
		handleQuestion(payLoad)
		
	}
		
	const removeQuestion = (value: string) => {
		const payLoad = questionList.filter((el) => el.name !== value)
		handleQuestion(payLoad)
	}

	const cloneQuestion = (index: number) => {
		const payLoad = questionList[index]
		addQuestion({...payLoad, id: null  })
	}


	return (
		<div className="addQuestionComponent__questionList">
			<div className='addQuestionComponent__question'>
				{questionList.map((el, i) => (
					<AddQuestionForm
						key={i}
						index={i}
						src={defaultTestPicture}
						handleQuestion={handleOnChange}
						data={el}
						cloneQuestion={cloneQuestion}
						removeQuestion={removeQuestion}
					/>
				))}
			</div>
		</div>
	)
}
