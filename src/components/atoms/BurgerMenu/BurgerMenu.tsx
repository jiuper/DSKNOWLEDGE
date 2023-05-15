import { useState } from "react"
import { Picture } from "../Picture/Picture"
import burgerMenu from "../../../assets/images/burger-menu.svg"
import littleLogo from "../../../assets/images/little-logo.png"
import usersIcon from "../../../assets/images/users-icon.svg"
import testIconDiactive from "../../../assets/images/icon-test-diactive.svg"
import { useHookDispatch, useHookSelector } from "../../../store/reducers/redux"
import { editCategoryAction } from "../../../store/reducers/EditCategoryEdit/EditCategoryEdit"

import "./style.css"
import { ERoutes } from "../../../constants/paths"
import { useNavigate } from "react-router-dom"
import classNames from "classnames"

export const BurgerMenu = () => {
	const dispatch = useHookDispatch()
	const { isOpen } = useHookSelector((state) => state.editCategoryReducer)
	const [isActive, setIsActive] = useState<boolean>(true)
	const href = useNavigate()

	return (
		<div
			className={classNames("burgerMenu__container", {
				burgerMenu__container__active: isOpen,
			})}>
			<div className="burgerMenu__menuItems">
				<div
					className={classNames("burger burgerMenu__menuItems__item", {
						"burgerMenu__menuItems__item-active": !isOpen,
					})}
					onClick={() => dispatch(editCategoryAction.setBurger())}>
					<Picture
						src={burgerMenu}
						alt="oops"
						classPrefix="burgerMenu__menuItems__item-picture"
					/>
				</div>
				<div
					className={classNames("burgerMenu__menuItems__item", {
						"burgerMenu__menuItems__item-open": isActive,
						"burgerMenu__menuItems__item-active": !isOpen,
					})}
					onClick={() => {
						setIsActive(true)
						href(ERoutes.adminPanel)
					}}>
					<Picture
						src={testIconDiactive}
						classPrefix={classNames({
							"burgerMenu__menuItems__item-pictureActive": isActive,
						})}
					/>
					<span
						className={classNames("burgerMenu__menuItems__item-text", {
							burgerActiveText: isActive,
							dnone: !isOpen,
						})}>
						Тесты
					</span>
				</div>
			</div>
			<div className="burgerMenu__littlelogo">
				<Picture src={littleLogo} alt="oops" classPrefix="" />
			</div>
		</div>
	)
}
