import React from "react"
import { useNavigate } from "react-router-dom"

import { useHookDispatch } from "../../../store/reducers/redux"

import { profileAction } from "../../../store/reducers/profileReducer/profileReducer"
import { modalAction } from "../../../store/reducers/modalReduser/modalReducer"
import { isAuthAction } from "../../../store/reducers/isAuthReducer/isAuthReducer"
import { tabsAction } from "../../../store/reducers/tabsReducer/tabsReducer"

interface ILink {
	href: string | undefined;
	title?: string;
	classPrefix?: string;
	children?: React.ReactNode;
}

export const Link = ({ href = "", title, classPrefix, children }: ILink) => {

	const link = useNavigate()
	const dispatch = useHookDispatch()
	const withAction = (title?: string) => {

		switch (title) {
			case "Контакты":
				dispatch(modalAction.ModalChanger(true))
				document.body.style.overflow="hidden"
				break
			case "Профиль":
				dispatch(tabsAction.profileType("isProfile"))
				link(href)
				break
			case "Результаты тестов":
				dispatch(tabsAction.profileType("isResultTest"))
				link(href)
				break
			case "Выход":
				dispatch(isAuthAction.isLogout())
				localStorage.clear()
				link(href)
				break
			case "#":
				link('#')
				break
			case "перейти":
				dispatch(modalAction.ModalDonut(true))
				document.body.style.overflow = "hidden"
				link(href)
				break	
			default:
				return link(href)
		}
	}

	return (
		<span className={classPrefix} onClick={() => withAction(title)}>
			{title}
			{children}
		</span>
	)
}
