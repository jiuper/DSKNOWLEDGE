import "./style.css"
import { useHookDispatch, useHookSelector } from "../../../store/reducers/redux"
import { useEffect, useMemo, useState } from "react"
import { TestDescAction } from "../../../store/reducers/TestsForDescription/TestsForDescription"
import { QustionBoxItemType } from "../../../types/type"

export const QustionBoxItem = ({
	sequenceNum,
	nextQuest,
	index,
	arrayIndex,
}: QustionBoxItemType) => {
	const { totalBar, testLists } = useHookSelector(
		(state) => state.TestDescReducer
	)

	const dispatch = useHookDispatch()
	const [style, setStyle] = useState<string>("")

	const filterNameTest = useMemo(
		() =>
			testLists
				.find((item, i) => i === nextQuest)
				?.trueAnswers.filter((el) => el.trim() !== ""),
		[testLists, nextQuest]
	)

	const answersLength = useMemo(
		() =>
			testLists
				.find((item, i) => i === nextQuest)
				?.answers.filter((el) => el.trim() !== ""),
		[testLists, nextQuest]
	)

	useEffect(() => {
		const indexQuest = nextQuest === index + arrayIndex * 38
		if (filterNameTest && answersLength) {
			const totals = totalBar.map((el) => el.trim())
			if (totalBar.length === 0 && nextQuest === index + arrayIndex * 38) {
				setStyle("active__empty")
				dispatch(TestDescAction.setArrStyle(style))
			} else if (
				filterNameTest.length === totals.length &&
				filterNameTest.every((el) => totals.includes(el)) &&
				indexQuest
			) {
				setStyle("right__point")
				dispatch(TestDescAction.setArrStyle(style))
			} else if (
				(totals.length === answersLength.length ||
					filterNameTest.every((el) => !totals.includes(el))) &&
				indexQuest
			) {
				setStyle("error__point")
				dispatch(TestDescAction.setArrStyle(style))
			} else if (
				filterNameTest.some((el) => totals.includes(el)) &&
				indexQuest
			) {
				setStyle("part__point")
				dispatch(TestDescAction.setArrStyle(style))
			}
		}
	}, [
		totalBar,
		nextQuest,
		style,
		filterNameTest,
		index,
		arrayIndex,
		answersLength,
		dispatch,
	])

	
	return (
		<div
			className={`boxItem ${
				nextQuest + 1 === sequenceNum + arrayIndex * 38
					? "active__point"
					: `${style}`
			} `}>
			{sequenceNum + arrayIndex * 38}
		</div>
	)
}
