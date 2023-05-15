import { QustionBoxItem } from "../../atoms/QustionBoxItem/QustionBoxItem"
import "./style.css"

interface ITestQuetionBoxes {
	nextQuest: number
	length: number
	arrayIndex: number
}

export const TestQuetionBox = ({
	length,
	nextQuest,
	arrayIndex,
}: ITestQuetionBoxes) => {
	const countsQuestion: number[] = Array(length)
		.fill("")
		.map((el, i) => i + 1)

	return (
		<div className="qustionBox">
			{
				<>
					<div className="qustionBox__list">
						{countsQuestion.map((item, i) => (
							<QustionBoxItem
								nextQuest={nextQuest}
								key={i}
								sequenceNum={i + 1}
								index={i}
								arrayIndex={arrayIndex}
							/>
						))}
					</div>
				</>
			}
		</div>
	)
}
