import { Picture } from "../../atoms/Picture/Picture"
import { Link } from "../../atoms/Link/Link"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useHookDispatch } from "../../../store/reducers/redux"
import { tabsAction } from "../../../store/reducers/tabsReducer/tabsReducer"
import { Button } from "../../atoms/Button/Button"

import "./style.css"

interface CreateCartEditType {
	id: string
	classPrefix?: string;
	src: string;
	title: string;
	text: string;
	level: string;
	questions: string;
	time: number;
	point: string;
}

export const CreateCartEdit = ({
	classPrefix,
	src,
	title,
	text,
	level,
	questions,
	time,
	point,
	id
}: CreateCartEditType) => {

	const [levels, setLevels] = useState<string>("Подготовительный")
	const href = useNavigate()
	const dispatch = useHookDispatch()
	const handleSwitch = () => {
		href(`${id}`)
		dispatch(tabsAction.addQuestionType("Test"))
	  }

	useEffect(() => {
		switch (level) {
			case "Preparatory":
				setLevels("Подготовительный")
				break
			case "Middle":
				setLevels("Базовый")
				break
			case "High":
				setLevels("Высокий")
		}
	}, [level, levels])

	return (
		<div className={`${classPrefix} cart-edit`}>
			<Picture classPrefix="cart-edit__image" src={src} />
			<div className="cart-edit__content">
				<h6>{title}</h6>
				<p className="cart-edit__text">
					{text}
				</p>
			</div>
			<ul className="cart-edit__info">
				<li>Уровень: {levels}</li>
				<li>Вопросы: {questions}</li>
				<li>Время: {time} минут</li>
				<li>Распределение балов: {point ?? "Авто"}</li>
			</ul>
			<Button classPrefix="cart-edit__link" name="Редактировать тест" handleAction={handleSwitch} />
		</div>
	)
}
