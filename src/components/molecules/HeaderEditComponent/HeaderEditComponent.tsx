import { useNavigate } from "react-router-dom"
import { ERoutes } from "../../../constants/paths"
import { CategoryIdSlise } from "../../../store/reducers/CategoryIdReducer/CategoryIdReducer"
import { useHookDispatch, useHookSelector } from "../../../store/reducers/redux"
import { Button } from "../../atoms/Button/Button"
import { Picture } from "../../atoms/Picture/Picture"
import { IHeaderEditComponent } from "../../../types/type"

import "./style.css"

export const HeaderEditComponent = ({ imageUrl, name, description, cntTest }: IHeaderEditComponent) => {

	const { isOpen } = useHookSelector(state => state.editCategoryReducer)
	const { actionPos } = useHookSelector(state => state.editCategoryReducer)
	const dispatch = useHookDispatch()

	const href = useNavigate()

	const handleClickRoute = (name: string) => {
		dispatch(CategoryIdSlise.actions.getButtonName(name))
		href(ERoutes.createSection + `/${actionPos}`)
	}

	return (
		<section className="editing-section">
			<Picture
				src={imageUrl ?? "https://by.joblum.com/uploads/3/2829.png"}
				alt="oops"
				classPrefix="editing-section__picture"
			/>

			<div className="editing-section__content">
				<h5 className="editing-section__title">{name}</h5>
				<p className={!isOpen ?
					"editing-section__description editing-section__description_active" :
					"editing-section__description"
				}>{description}</p>
				<span className="editing-section__quantity">{cntTest + " теста"}</span>
			</div>
			<Button
				name="Редактировать раздел"
				classPrefix="editing-section__button"
				handleAction={() => handleClickRoute("Редактировать раздел")}
			/>
		</section>
	)
}
