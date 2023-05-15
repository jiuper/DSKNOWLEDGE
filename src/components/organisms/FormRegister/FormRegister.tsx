import { ERoutes } from "../../../constants/paths"
import {
	formReget,
	IRegisterForm,
	IRegisterFormValues,
} from "../../../types/type"
import { Button } from "../../atoms/Button/Button"
import { Label } from "../../atoms/Label/Label"
import { Link } from "../../atoms/Link/Link"
import { TextField } from "../../atoms/TextField/TextField"
import "../LoginForm/LoginForm"
import { useHookSelector } from "../../../store/reducers/redux"
import { useFormLogin } from "../LoginForm/useFormLogin"

interface ILoginFormProps {
	onSubmit: (data: IRegisterForm) => void
}
interface IInputBody {
	placeholder: string
	disabled: boolean
	error: string | undefined
	value: string
	name: string
	type: formReget
}
export const FormRegister = ({ onSubmit }: ILoginFormProps) => {
	const names: IRegisterFormValues = {
		email: "",
		login: "",
		password: "",
		surName: "",
		patronymic: "",
		organisation: "",
		specialization: "",
		phoneNumber: "",
		firstName: "",
		lastName: "",
	}
	const { state, handleOnBlur, handleChange, isValid } = useFormLogin(names)
	const { error } = useHookSelector((state) => state.isAuthReducer)
	
	const inputBody: IInputBody[] = [
		{
			placeholder: "Имя",
			disabled: false,
			error:  state.firstName.error || undefined,
			value: state.firstName.value,
			name: "name",
			type: formReget.firstName,
		},
		{
			placeholder: "Фамилия",
			disabled: false,
			error:  state.surName.error || undefined,
			value: state.surName.value,
			name: "surname",
			type: formReget.surName,
		},
		{
			placeholder: "Отчество",
			disabled: false,
			error: state.lastName.error || undefined,
			value: state.lastName.value,
			name: "patronymic",
			type: formReget.lastName,
		},
		{
			placeholder: "Организация",
			disabled: false,
			error: state.organisation.error || undefined,
			value: state.organisation.value,
			name: "organisation",
			type: formReget.organisation,
		},
		{
			placeholder: "Специализация",
			disabled: false,
			error: state.specialization.error || undefined,
			value: state.specialization.value,
			name: "specialization",
			type: formReget.specialization,
		},
		{
			placeholder: "+375 ** *** ** **",
			disabled: false,
			error: state.phoneNumber.error || undefined,
			value: state.phoneNumber.value,
			name: "phoneNumber",
			type: formReget.phoneNumber,
		},
		{
			placeholder: "Email",
			disabled: false,
			error: state.email.error || undefined,
			value: state.email.value,
			name: "Email",
			type: formReget.email,
		},
	]

	const onSubmitForm = () => {
		const dateForm = {
			email: state.email.value,
			firstName: state.firstName.value,
			surName: state.surName.value,
			lastName: state.lastName.value,
			organisation: state.organisation.value,
			specialization: state.specialization.value,
			phoneNumber: state.phoneNumber.value,
		}
		onSubmit(dateForm)
	}
	return (
		<div className="loginForm">
			{inputBody.map((el) => (
				<TextField
					key={el.placeholder}
					placeholder={el.placeholder}
					disabled={el.disabled}
					classPrefix="field"
					//error={el.error}
					error={error !== "" && el.name === "Email" ? error : el.error}
					value={el.value}
					name={el.name}
					handleChange={(e) => handleChange(e.target.value, el.type)}
					isBlur={(e) => handleOnBlur(true, el.type)}
				/>
			))}

			<Button
				disabled={!isValid}
				name="Зарегистрироваться"
				classPrefix="login__button"
				handleAction={onSubmitForm}
			/>

			<div className="login__label">
				<Label classPrefix="label__text" title="У меня есть учетная запись?" />
				<Link
					classPrefix="login__link"
					href={ERoutes.login}
					title="Пройти авторизацию"
				/>
			</div>
		</div>
	)
}
