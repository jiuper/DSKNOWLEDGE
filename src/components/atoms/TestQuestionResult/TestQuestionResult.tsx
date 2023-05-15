interface ITestQuestionResult {
	filterResultQuest: number
}

export const TestQuestionResult = ({
	filterResultQuest,
}: ITestQuestionResult) => {
	return (
		<div className="qustionBox__count">
			<h3>Количество баллов</h3>
			<span>{filterResultQuest}</span>
		</div>
	)
}
