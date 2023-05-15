import { Picture } from "../Picture/Picture"
import pelvis from "../../../assets/images/pelvis.png"
import puzzle from "../../../assets/images/puzzle-icon.svg"
import list from "../../../assets/images/list-icon.svg"
import done from "../../../assets/images/done-icon.svg"
import dedline from "../../../assets/images/dedline-clock.svg"
import { Button } from "../Button/Button"
import { ITestQuestionsData } from "../../../types/type"
import { useNavigate } from "react-router"
import "./style.css"
import { useHookDispatch } from "../../../store/reducers/redux"
import { modalAction } from "../../../store/reducers/modalReduser/modalReducer"

import { useEffect, useState } from "react"
import { TestDescAction } from "../../../store/reducers/TestsForDescription/TestsForDescription"

interface IInfoItem {
	id: string
	category: string
	description: string
	timeForTest: number
	cntQuestion: string
	testLevel: any
	imageUrl: string
	score: string
	questions: ITestQuestionsData[]
	name: string
	isTestOnTime: string
	updateDate: string
	createdDate: string
	categoryId: string
	threshold:number
}

export const InfoItem = ({
	id,
	category,
	threshold,
	description,
	timeForTest,
	cntQuestion,
	testLevel,
	imageUrl,
	score,
	questions,
	name,
	isTestOnTime,
	updateDate,
	createdDate,
	categoryId,
}: IInfoItem) => {
	const href = useNavigate()
	const dispatch = useHookDispatch()

	const [level, setLevel] = useState<string>("Подготовительный")
	useEffect(() => {
		switch (testLevel) {
			case "Preparatory":
				setLevel("Подготовительный")
				break
			case "Middle":
				setLevel("Базовый")
				break
			case "High":
				setLevel("Высокий")
		}
	}, [testLevel, timeForTest])

	const startTest = () => {
		dispatch(modalAction.ModalCangerInfoItem(true))
		dispatch(TestDescAction.setEmptyTestLists())
		document.body.style.overflow = "hidden"
		dispatch(modalAction.getActualItem(id))
		localStorage.setItem("timeForTest", `${timeForTest}`)
	}

	return (
		<div className="info-item">
			<h4 className="info-item__title">{name}</h4>
			<div className="info-item__description">
				<Picture
					classPrefix="info-item__icon"
					src={imageUrl ? imageUrl : pelvis}
					alt="icon"
				/>
				<div className="info-item__status">
					<div>
						<Picture classPrefix="info-item__img" src={puzzle} />
						{level} уровень
					</div>
					<div>
						<Picture classPrefix="info-item__img" src={list} />
						{cntQuestion} вопросов
					</div>
					<div>
						<Picture classPrefix="info-item__img" src={done} />
						{score} баллов - максимальная оценка, порог прохождения - {threshold * + score / 10} баллов
					</div>
					<div>
						<Picture classPrefix="info-item__img" src={dedline} />
						{timeForTest === 0 ? "Без время" : timeForTest + " " + "минут"}
					</div>
				</div>
			</div>
			<div className="info-item__text">
				<p>{description}</p>
			</div>
			<div className="info-item__buttons buttons">
				<div></div>
				<div className="buttons__group">
					<Button
						classPrefix="buttons__back buttonst__transparent"
						name="Назад"
						handleAction={() => href(-1)}
					/>
					<Button
						classPrefix="buttons__start"
						name="Начать тест"
						handleAction={startTest}
					/>
				</div>
			</div>
		</div>
	)
}
