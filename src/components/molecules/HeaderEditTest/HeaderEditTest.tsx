import React, { useEffect, useState } from "react"
import { Label } from "../../atoms/Label/Label"
import { Picture } from "../../atoms/Picture/Picture"
import listIcon from "../../../assets/images/list-icon.svg"
import puzzleIcon from "../../../assets/images/puzzle-icon.svg"
import clockIcon from "../../../assets/images/clock-icon.svg"
import arrowIcon from "../../../assets/images/arrow-icon.svg"
import "./style.css"
import { useNavigate } from "react-router"
import { ERoutes } from "../../../constants/paths"
import { fetchTestById } from "../../../api/FetchTestById/FetchTestById"
import { useHookDispatch } from "../../../store/reducers/redux"

interface IHeaderEditTest {
	id: string,
	picture: string,
	title: string,
	description: string,
	numberOfQuestion: string,
	complexity: string,
	duration: number
}

export const HeaderEditTest = ({
																 id,
																 picture,
																 title,
																 description,
																 numberOfQuestion,
																 complexity,
																 duration
															 }: IHeaderEditTest) => {
	const href = useNavigate()
	const dispatch = useHookDispatch()

	const hreff = () => {
		href(ERoutes.editTest)
		dispatch(fetchTestById(id))
	}
	const [level, setLevel] = useState<string>("Подготовительный")
	useEffect(() => {
		switch (complexity) {
			case "Preparatory":
				setLevel("Подготовительный")
				break
			case "Middle":
				setLevel("Базовый")
				break
			case "High":
				setLevel("Высокий")
		}

	}, [complexity, level])


	return (
		<section className="headerEditTest__container" onClick={hreff}>
			<Picture
				src={picture ?? "https://avatars.mds.yandex.net/i?id=ec9198794d4b680715e90e5bbb5818ff6d1632c0-9065879-images-thumbs&n=13"}
				alt="Oops"
				classPrefix="headerEditTest__picture"
			/>
			<div className="headerEditTest__textGroup">
				<Label
					title={title}
					classPrefix="headerEditTest__textGroup__title"
				/>
				<Label
					title={description}
					classPrefix="headerEditTest__textGroup__description"
				/>
				<div className="headerEditTest__textGroup__iconGroup">
					<div className="iconIcon">

						<Picture src={listIcon} alt="icon" classPrefix="headerEditTest__textGroup__iconGroup" />
						{numberOfQuestion}
					</div>
					<div className="iconIcon">

						<Picture src={puzzleIcon} alt="icon" classPrefix="headerEditTest__textGroup__iconGroup" />
						{level}
					</div>
					<div className="iconIcon">

						<Picture src={clockIcon} alt="icon" classPrefix="headerEditTest__textGroup__iconGroup" />
						{duration === 0 ? "Без времени" : duration + " мин"}
					</div>
				</div>

			</div>
			<Picture
				src={arrowIcon}
				classPrefix="headerEditTest-arrowIcon"
			/>
		</section>
	)
}
