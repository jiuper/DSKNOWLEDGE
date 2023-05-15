import { Picture } from "../Picture/Picture"
import listIcon from "../../../assets/images/list-icon.svg"
import puzzleIcon from "../../../assets/images/puzzle-icon.svg"
import clockIcon from "../../../assets/images/clock-icon.svg"
import { ITestsCatalogPage } from "../../../types/type"
import imageContainer from "../../../assets/images/image-container.png"
import { useNavigate } from "react-router-dom"
import { ERoutes } from "../../../constants/paths"
import { useHookDispatch, useHookSelector } from "../../../store/reducers/redux"
import { useCallback } from "react"
import { modalAction } from "../../../store/reducers/modalReduser/modalReducer"
import "./style.css"

export const CatalogCard = ({
	id,
	category,
	categoryId,
	name,
	cntQuestion,
	imageUrl,
	isTestOnTime,
	timeForTest,
	score,
	testLevel,
	createdDate,
	updateDate,
	description,
	questions,
}: ITestsCatalogPage) => {
	const href = useNavigate()
	const dispatch = useHookDispatch()

	const { loginListsData } = useHookSelector((state) => state.isAuthReducer)

	const openTest = useCallback(() => {
		const ls = localStorage.getItem("userData")

		if ((loginListsData && ls) !== null) {
			href(ERoutes.testDescription + `/${id}`)
		} else {
			document.body.style.overflow = "hidden"
			dispatch(modalAction.ModalChagerTestCalalog(true))
		}
	}, [loginListsData, href, id, dispatch])

	return (
		<div className="catalog-card" onClick={openTest}>
			<div className="catalog-card__wrapper">
				<div>
					<Picture
						classPrefix="catalog-card__img"
						src={imageUrl ? imageUrl : imageContainer}
						alt="icon"
					/>
					{score ? (
						<div className="catalog-card__info">{score} баллов</div>
					) : (
						<></>
					)}
					<div className="catalog-card__content">
						<h6 className="catalog-card__title">{name}</h6>
						<p className="catalog-card__text">{description}</p>
					</div>
				</div>

				<div className="catalog-card__resume">
					<div>
						{cntQuestion}
						<Picture src={listIcon} alt="icon" />
					</div>
					<div>
						{testLevel === "Preparatory" ? 1 : testLevel === "Middle" ? 2 : 3}
						<Picture src={puzzleIcon} alt="icon" />
					</div>
					<div>
						{timeForTest === 0 ? "Без время" : timeForTest + " " + "минут"}
						<Picture src={clockIcon} alt="icon" />
					</div>
				</div>
			</div>
		</div>
	)
}
