import { Button } from "../../atoms/Button/Button"
import { TextField } from "../../atoms/TextField/TextField"
import { Label } from "../../atoms/Label/Label"
import { Link } from "../../atoms/Link/Link"
import { ERoutes } from "../../../constants/paths"
import { ILoginForm, ILoginFormValues } from "../../../types/type"
import { useFormLogin } from "./useFormLogin"
import "./style.css"

interface ILoginFormProps {
	onSubmit: (data: ILoginForm) => void
	authError: string
}

export const LoginForm = ({ onSubmit, authError }: ILoginFormProps) => {
	const names: ILoginFormValues = {
		email: "",
		password: "",
	}
	const { state, handleOnBlur, handleChange, isValid } = useFormLogin(names)
	const onSubmitForm = () => {
		const dateForm = {
			email: state.email.value,
			password: state.password.value,
		}
		onSubmit(dateForm)
	}

	return (
		<form className="loginForm">
			<TextField
				placeholder="Email"
				disabled={false}
				classPrefix="field"
				error={state.email.error || undefined}
				value={state.email.value}
				name="Email"
				handleChange={(e) => handleChange(e.target.value, "email")}
				isBlur={(e) => handleOnBlur(true, "email")}
			/>
			<TextField
				placeholder="Password"
				disabled={false}
				classPrefix="field"
				error={state.password.error || undefined}
				value={state.password.value}
				name="Password"
				type="password"
				handleChange={(e) => handleChange(e.target.value, "password")}
				isBlur={(e) => handleOnBlur(true, "password")}
			/>
			{authError && <Label title={authError} classPrefix="label-error" />}
			<Button
				disabled={!isValid}
				name="Войти"
				classPrefix="login__button"
				handleAction={onSubmitForm}
			/>

			<div className="login__label">
				<Label classPrefix="label__text" title="У меня нет учетной записи?" />
				<Link
					classPrefix="login__link"
					href={ERoutes.reget}
					title="Пройти регистрацию"
				/>
			</div>
		</form>
	)
}
