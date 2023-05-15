import "./style.css"

export interface TestQustionStatusType {
	nextQuest: number;
	error: number;
	part: number;
	right: number;
}

export const TestQustionStatus = ({ nextQuest, error, part, right }: TestQustionStatusType) => {

	return (
		<div className="qustionStatus">
			<span>Количество отвеченных: {nextQuest}</span>
			<span>Правильных ответов: {right}</span>
			<span>Неправильных ответов: {error}</span>
			<span>Частичных ответов: {part}</span>
		</div>
	)
}
