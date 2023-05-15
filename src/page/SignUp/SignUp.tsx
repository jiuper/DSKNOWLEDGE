import { BreadCrumbs } from "../../components/atoms/BreadCrumbs/BreadCrumbs"
import { Label } from "../../components/atoms/Label/Label"
import { Picture } from "../../components/atoms/Picture/Picture"
import { FormRegister } from "../../components/organisms/FormRegister/FormRegister"
import { breadCrumbs, ERoutes } from "../../constants/paths"
import { IRegisterForm } from "../../types/type"
import { Header } from "../../components/template/Header/Header"
import { fetchRegister } from "../../api/FetchRegister/FetchRegister"
import { useLocation, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { Button } from "../../components/atoms/Button/Button"
import { useHookDispatch, useHookSelector } from "../../store/reducers/redux"
import single from "../../assets/images/signInPicture.svg"
import "../SignIn/style.css"

export const SignUp = () => {
	const href = useNavigate()
	const { pathname } = useLocation()
	const dispatch = useHookDispatch()
	const [isActive, setIsActive] = useState<IRegisterForm>({
		email: "",
		surName: "",
		firstName: "",
		lastName: "",
		organisation: "",
		phoneNumber: "",
		specialization: "",
	})

	const { message } = useHookSelector((state) => state.isAuthReducer)

	useEffect(() => {
		if (isActive.email !== "") {
			dispatch(fetchRegister(isActive))
		}
	}, [isActive, dispatch])

	const fetchData = (value: IRegisterForm) => {
		setIsActive(value)
	}

	return (
		<>
			<Header auth={false} />
			<div className="container">
				<BreadCrumbs paths={breadCrumbs[pathname.split("/")[1]]} />
				<div className="signin__wrapper">
					<div className="signin__content">
						<Label classPrefix="signin__title" title="Регистрация" />
						<div className="signin__form">
							{message === "" ? (
								<FormRegister onSubmit={fetchData} />
							) : (
								<>
									<span className="small__text">
										Аккаунт успешно создан. Пароль отправлен на почту{" "}
										{isActive.email}
									</span>
									<Button
										name="Перейти к почте"
										classPrefix="login__button"
										handleAction={() => {
											window.location.href = "https://google.com"
										}}
									/>
									<Button
										name="Авторизироваться"
										classPrefix="login__button button-white"
										handleAction={() => {
											href(ERoutes.login)
										}}
									/>
								</>
							)}
						</div>
					</div>
					<Picture src={single} />
				</div>
			</div>
		</>
	)
}
