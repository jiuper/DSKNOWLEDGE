import { IconButton } from "../../atoms/IconButton/IconButton"
import paginazionIcon from "../../../assets/images/zoom_out_map.svg"
import { modalAction } from "../../../store/reducers/modalReduser/modalReducer"
import { TestQuetionBox } from "../../molecules/TestQustionBox/TestQuetionBox"
import { TestQuestionResult } from "../../atoms/TestQuestionResult/TestQuestionResult"
import { useHookDispatch } from "../../../store/reducers/redux"
import { Carousel } from "../../molecules/Carousel/Carousel"

interface ITestQuetionGroupez {
	nextQuest: number
	length: number
	filterResultQuest: number
}

export const TestQuestionGroup = ({
	filterResultQuest,
	length,
	nextQuest,
}: ITestQuetionGroupez) => {
	const dispatch = useHookDispatch()

	const questArr: number[] = []

	for (let i = 0; length !== 0; i++) {
		if (length > 38 && length !== 0) {
			questArr.push(38)
			length = length - 38
		} else {
			questArr.push(length)
			length -= length
			break
		}
	}

	return (
		<div className="pagination">
			<div className="pagination__items">
				<IconButton
					classPrefix="pagination__button"
					icon={paginazionIcon}
					handleAction={() => {
						dispatch(modalAction.ModalIsPaginationTest(true))
						document.body.style.overflow = "hidden"
					}}
				/>
				<Carousel
					classPrefix={questArr.length === 1 ? "right_opacity left_opacity" : ""}
					width={870}
					length={questArr.length - 1}
					initionalValue={0}
				>
					{questArr.map((el, i) => (
						<TestQuetionBox
							key={i}
							nextQuest={nextQuest}
							length={el}
							arrayIndex={i}
						/>
					))}
				</Carousel>
			</div>
			<TestQuestionResult filterResultQuest={filterResultQuest} />
		</div>
	)
}
