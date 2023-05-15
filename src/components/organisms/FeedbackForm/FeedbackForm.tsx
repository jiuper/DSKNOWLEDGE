import { useCallback, useState } from "react"
import { IFeedbackForm } from "../../../types/type"
import { Button } from "../../atoms/Button/Button"
import { Label } from "../../atoms/Label/Label"
import { Select } from "../../atoms/Select/Select"
import { TextArea } from "../../atoms/TextArea/TextArea"
import { TextField } from "../../atoms/TextField/TextField"
import { feedbackOptions } from "../../../constants/links"
import close from "../../../assets/images/close-icon.svg"
import { Picture } from "../../atoms/Picture/Picture"
import "./style.css"
import { modalAction } from "../../../store/reducers/modalReduser/modalReducer"
import { useHookDispatch, useHookSelector } from "../../../store/reducers/redux"
import { selectAction } from "../../../store/reducers/SelectReduser/SelectReduser"


interface IFeedbackFormProps {
	onSubmit: (data: IFeedbackForm) => void;
	children?: React.ReactNode;
}

export const FeedbackForm = ({ onSubmit, children }: IFeedbackFormProps) => {
	const [value, setValue] = useState<IFeedbackForm>({ name: "", surname: "", email: "", problem: "", theme: "" })

	const dispatch = useHookDispatch()
	const onSubmitForm = () => {
		const dateForm = {
			name: value.name,
			surname: value.surname,
			email: value.email,
			theme: value.theme,
			problem: value.problem
		}
		setValue({ name: "", surname: "", email: "", problem: "" , theme: "" })
		onSubmit(dateForm)
	}

	return (
		<section className="feedback_wrapper">

			<div className="feedback">
				<div className="feedback__title">
					<Label
						title="Отправьте нам cообщение"
					/>
					<Picture
						src={close}
						alt="close"
						classPrefix="modal__close"
						handleAction={() => {
							dispatch(modalAction.ModalChanger(false))
							document.body.style.overflow = ""
							setValue({ name: "", surname: "", email: "", problem: "" , theme: "" })
						}}
					/>
				</div>
				<div className="feedback__container">
					<div className="feedback__userData">
						<div className="feedback__userData__fio">
							<TextField
								placeholder="Имя"
								classPrefix="feedback_input"
								value={value.name}
								handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setValue({ ...value, name: e.target.value })}
								disabled={false}
							/>
							<TextField
								placeholder="Фамилия"
								classPrefix="feedback_input"
								value={value.surname}
								handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setValue({ ...value, surname: e.target.value })}
								disabled={false}
							/>
						</div>
						<div className="feedback__userData__other">
							<TextField
								placeholder="Email"
								classPrefix="feedback_input"
								value={value.email}
								handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setValue({ ...value, email: e.target.value })}
								disabled={false}
							/>
							<TextField
								placeholder="Тема"
								classPrefix="feedback_input"
								value={value.theme}
								handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setValue({ ...value, theme: e.target.value })}
								disabled={false}
							/>
						</div>
						<div className="feedback__userData__problem">
							<TextArea
								placeholder="Опишите проблему"
								value={value.problem}
								handleChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
									setValue({ ...value, problem: e.target.value })}
								disabled={false}
								classPrefix="feedback__userData__problem_text"
							/>
						</div>
					</div>
					<div className="feedback__button">
						<Button
							disabled={false}
							name="Отправить"
							classPrefix="feedback__button_text"
							handleAction={onSubmitForm}
						/>
					</div>
				</div>
			</div>
			{children}
		</section>
	)
}
