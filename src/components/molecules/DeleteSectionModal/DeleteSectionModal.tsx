import { useNavigate } from "react-router-dom"
import { fetchDeleteCategory } from "../../../api/FetchDeleteCategory/FetchDeleteCategory"
import { modalAction } from "../../../store/reducers/modalReduser/modalReducer"
import { useHookDispatch, useHookSelector } from "../../../store/reducers/redux"
import { Button } from "../../atoms/Button/Button"
import { Label } from "../../atoms/Label/Label"

import "./style.css"
import { fetchCatalogTest } from "../../../api/FetchCatalogTest/FetchCatalogTest"

interface IDeleteSectionModal {
	sectionTitle: string
	id?: string
}

export const DeleteSectionModal = ({ sectionTitle, id }: IDeleteSectionModal) => {

	const href = useNavigate()
	const { actionPos } = useHookSelector(state => state.editCategoryReducer)
	const dispatch = useHookDispatch()

	const removeTest = () => {
		fetchDeleteCategory(actionPos).then(resp => {
			if (resp === 200) {
				fetchCatalogTest()
				href("/adminPanel")
			}
			dispatch(modalAction.ModalRemoveSection(false))
			document.body.style.overflow = ""
		})
	}

	return (
		<section className="deleteSectionModal__container">
			<div className="deleteSectionModal__Texts">
				<Label
					title="Удаление раздела"
					classPrefix="deleteSectionModal__Texts-title"
				/>
				<Label
					title={`Это действие невозможно отменить! 
            Вы действительно хотите удалить раздел «${sectionTitle}»?`}
					classPrefix="deleteSectionModal__Texts-caption"
				/>

			</div>
			<div className="deleteSectionModal__buttonGroup">
				<Button
					name="Отмена"
					classPrefix="deleteSectionModal__buttonGroup-CancelButton"
					handleAction={() => {
						dispatch(modalAction.ModalRemoveSection(false))
						document.body.style.overflow = ""
					}}
				/>
				<Button
					name="Удалить"
					classPrefix="deleteSectionModal__buttonGroup-DeletelButton"
					handleAction={removeTest}
				/>
			</div>
		</section>
	)
}
