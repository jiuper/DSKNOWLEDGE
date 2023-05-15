import { Label } from "../../atoms/Label/Label"
import { Picture } from "../../atoms/Picture/Picture"
import close from "../../../assets/images/close-icon.svg"
import { modalAction } from "../../../store/reducers/modalReduser/modalReducer"
import { TestQuetionBox } from "../../molecules/TestQustionBox/TestQuetionBox"
import { useHookDispatch } from "../../../store/reducers/redux"

import "./style.css"
import { Button } from "../../atoms/Button/Button"

interface IModalPaginationTest {
	nextQuest: number
	length: number
	onButtonAction: (type: string) => void
}

export const ModalPaginationTest = ({
	nextQuest,
	length,
	onButtonAction,
}: IModalPaginationTest) => {
	const dispatch = useHookDispatch()

	return (
		<div className="pagination__test">
			<div className="pagination__title">
				<Label title="Задания" />
				<Picture
					src={close}
					alt="close"
					classPrefix="modal__close"
					handleAction={() => {
						dispatch(modalAction.ModalIsPaginationTest(false))
						document.body.style.overflow = ""
					}}
				/>
			</div>
			<TestQuetionBox nextQuest={nextQuest} length={length} arrayIndex={0} />

			<div className="pagination__buttonOff">
				<Button
					classPrefix="qustionGroup__button-right"
					name="Завершить тест"
					handleAction={() => onButtonAction("onFinishTest")}
				/>
			</div>
		</div>
	)
}
