import { LoginForm } from "../../components/organisms/LoginForm/LoginForm"
import { Label } from "../../components/atoms/Label/Label"
import { BreadCrumbs } from "../../components/atoms/BreadCrumbs/BreadCrumbs"
import { breadCrumbs, ERoutes } from "../../constants/paths"
import { ILoginForm } from "../../types/type"
import single from "../../assets/images/signInPicture.svg"
import { Picture } from "../../components/atoms/Picture/Picture"
import { Header } from "../../components/template/Header/Header"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { useHookDispatch, useHookSelector } from "../../store/reducers/redux"
import { modalAction } from "../../store/reducers/modalReduser/modalReducer"
import { fetchLogin } from "../../api/FetchLogin/FetchLogin"
import "./style.css"

export const Signin = () => {
	const { pathname } = useLocation()
	const { loginListsData, error } = useHookSelector(
		(state) => state.isAuthReducer
	)
	const { isTestCategoryModalActive } = useHookSelector(
		(state) => state.modalReducer
	)

	const href = useNavigate()
	const dispatch = useHookDispatch()
	const [enteredValue, setEnteredValue] = useState<{
		email: string
		password: string
	}>({ email: "", password: "" })
	const [authError, setAuthError] = useState<string>("")

	useEffect(() => {
		if (enteredValue.email !== "") {
			dispatch(fetchLogin(enteredValue))
			setAuthError(error)
		}

		if (isTestCategoryModalActive && loginListsData?.id) {
			href(ERoutes.tests)
			dispatch(modalAction.ModalChagerTestCalalog(false))
		} else if (loginListsData?.id) {
			loginListsData?.roleName?.toLowerCase() === "admin"
				? href(ERoutes.adminPanel)
				: href(`/profile/${loginListsData?.id}`)
		}
		if (loginListsData?.token !== undefined) {
			const userDate = {
				token: loginListsData.token,
				id: loginListsData.id,
			}
			localStorage.setItem("userData", JSON.stringify(userDate))
		}
	}, [
		loginListsData,
		enteredValue,
		error,
		dispatch,
		href,
		isTestCategoryModalActive,
	])

	const fetchData = async (value: ILoginForm) => {
		setEnteredValue({ email: value.email, password: value.password })
	}

	return (
		<>
			<Header auth={false} />
			<div className="container">
				<BreadCrumbs paths={breadCrumbs[pathname.split("/")[1]]} />
				<div className="signin__wrapper">
					<div className="signin__content">
						<Label classPrefix="signin__title" title="Вход в систему" />
						<div className="signin__form">
							<LoginForm onSubmit={fetchData} authError={authError} />
						</div>
					</div>

					<Picture src={single} />
				</div>
			</div>
		</>
	)
}
