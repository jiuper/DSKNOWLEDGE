import { Label } from "../../atoms/Label/Label"
import { Picture } from "../../atoms/Picture/Picture"
import { PictureWithButton } from "../../atoms/PictureWithButton/PictureWithButton"
import deleteIcon from "../../../assets/images/delete-icon.svg"
import deleteIconBig from "../../../assets/images/delete-icon-big.svg"
import editIcon from "../../../assets/images/edit-icon.svg"
import copyIcon from "../../../assets/images/copy-icon.svg"
import { SelectForAddi } from "../../atoms/Select/SelectForAddi"
import { Button } from "../../atoms/Button/Button"
import { CheckBoxGroupForAddQuestion } from "../../atoms/CheckBoxForAddQuestion/CheckBoxGroupForAddQuestion"
import { IQuestionState, ITransfer } from "../../../types/type"
import { TextField } from "../../atoms/TextField/TextField"
import "./style.css"
import { useHookDispatch, useHookSelector } from "../../../store/reducers/redux"
import { modalAction } from "../../../store/reducers/modalReduser/modalReducer"
import { RadioGroupForAddQustioin } from "../../atoms/RadioGroup/RadioGroupForAddQustioin"
import { UploadPictureModal } from "../../molecules/UploadPictureModal/UploadPictureModal"
import { Modal } from "../../molecules/Modal/Modal"
import { BoxImgItemType } from "../../atoms/BoxImgList/BoxImgItem"
import { useEffect, useState } from "react"
import { emptyInput, emptyQuestion, incorrectValue } from "../../../constants/errors"

interface IAddQuestionForm {
	src: string
	index: number
	handleQuestion: (value: IQuestionState, index: number) => void
	data: IQuestionState
	removeQuestion: (value: string) => void
	cloneQuestion: (value: number) => void
}

export const AddQuestionForm = ({
	src,
	handleQuestion,
	data,
	index,
	cloneQuestion,
	removeQuestion,
}: IAddQuestionForm) => {
	const dispatch = useHookDispatch()

	const { uploadImage } = useHookSelector((state) => state.modalReducer)

	const onLoadImg = (value: BoxImgItemType) => {
		if (value?.src !== undefined) {
			handleQuestion({ ...data, iconUrl: value.src }, index)
		}
	}
	const onDeleteImg = ()=>{
		handleQuestion({ ...data, iconUrl: "" }, index)
	}
	useEffect(() => {
		if (data.iconUrl === "") {
			handleQuestion(
				{
					...data,
					iconUrl:
						"https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1Rkmw9BP6edNCGe0A3vUrPdOKaKTM5SRkZCeTgDn6uOyic",
				},
				index
			)
		}
	}, [data.iconUrl, handleQuestion])

	const onChange = (value: ITransfer, index1: number) => {
		if (!data.trueAnswers.includes(value.title)) {
			handleQuestion(
				{
					...data,
					trueAnswers: data.trueAnswers.map((el, i) =>
						i === index1 ? value.title : el
					),
				},
				index
			)
		} else {
			handleQuestion(
				{
					...data,
					trueAnswers: data.trueAnswers.map((el, i) =>
						i === index1 ? null : el
					),
				},
				index
			)
		}
	}

	const onChangeRadio = (value: ITransfer) => {
		handleQuestion({ ...data, trueAnswers: [value.title] }, index)
	}

	const onInput = (value: ITransfer, index1: number) => {
		handleQuestion(
			{
				...data,
				answers: data.answers.map((el, i) => (i === index1 ? value.title : el)),
			},
			index
		)
	}

	const onSelectAnserMethod = (value: string, title: string) => {
		handleQuestion(
			{ ...data, questionType: value, answers: [], trueAnswers: [], name: "" },
			index
		)
	}
	const [wordingIsValidate, setWordingIsValidate] = useState<boolean>(false)

	useEffect(() => {
		if (data.answers.length !== 0 && data.name.length === 0) {
			setWordingIsValidate(true)
		}
	}, [data.answers.length])

	const [numberInputIsvalidate, setNumberInputIsvalidate] =
		useState<boolean>(false)

	const [radioGroupIsValudate, setRadioGroupIsValudate] =
		useState<boolean>(false)

	useEffect(() => {
		if (
			data.answers.every((answer) => answer.trim()) &&
			data.trueAnswers.length !== 0
		) {
			setRadioGroupIsValudate(false)
		} else {
			setRadioGroupIsValudate(true)
		}
	}, [onInput])
	useEffect(() => {
		if(data.numberOfPoints === 0){
			setNumberInputIsvalidate(true)
		}
		if (!wordingIsValidate && !radioGroupIsValudate && !numberInputIsvalidate) {
			handleQuestion(
				{
					...data,
					isValidate: true,
				},
				index
			)
		} else {
			handleQuestion(
				{
					...data,
					isValidate: false,
				},
				index
			)
		}
	}, [wordingIsValidate, radioGroupIsValudate, numberInputIsvalidate])


	
	return (
		<section className="addQuestionForm__container">
			<div className="addQuestionForm__border">
				<div className="addQuestionForm__counntAndDropdown">
					<Label
						title={`Задание ${index + 1}`}
						classPrefix="addQuestionForm__counntAndDropdown-text"
					/>
					<SelectForAddi
						classPrefix="addQuestionForm__counntAndDropdown-select"
						onSelectAnserMethod={onSelectAnserMethod}
						questionType={data.questionType}
					/>
				</div>

				<div className="addQuestionForm__questionForm">
					<PictureWithButton
						src={
							data.iconUrl
								? data.iconUrl
								: "https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1Rkmw9BP6edNCGe0A3vUrPdOKaKTM5SRkZCeTgDn6uOyic"
						}
						classPrefix="addQuestionForm__questionForm__Picture">
						<div className="addQuestionForm__questionForm__Picture__icons">
						<Picture
								src={deleteIcon}
								classPrefix="addQuestionForm__questionForm__Picture__icons-hover"
								handleAction={onDeleteImg}
							/>
							<Picture
								src={editIcon}
								classPrefix="addQuestionForm__questionForm__Picture__icons-hover"
								handleAction={() => {
									dispatch(modalAction.ModalUploadImage(true))
									document.body.style.overflow = "hidden"
								}}
							/>
						</div>
					</PictureWithButton>
					<div className="addQuestionForm__questionForm__form">
						<div className="addQuestionForm__questionForm__form__title">
							<Label
								title="Формулировка"
								classPrefix="addQuestionForm__questionForm__form__title-text"
							/>
							<TextField
								placeholder="Введите вопрос"
								classPrefix={`${
									wordingIsValidate && "validateError"
								} addQuestionForm__questionForm__form__title-input `}
								handleChange={(event) => {
									handleQuestion({ ...data, name: event.target.value }, index)
									setWordingIsValidate(false)
								}}
								value={data.name}
								id={data.name}
								isBlur={() => {
									if (data.name.length === 0) {
										setWordingIsValidate(true)
									}
								}}
							/>
							{wordingIsValidate && (
								<span className="validateError">{emptyQuestion}</span>
							)}
						</div>

						{data.questionType === "OneOfMany" && (
							<div className="addQuestionForm__questionForm__radioGroup">
								<Label
									title="Ответы. Выберите верный вариант"
									classPrefix="addQuestionForm__questionForm__radioGroup-text"
								/>
								<RadioGroupForAddQustioin
									onChange={onChangeRadio}
									onInput={onInput}
									name={`${data.name}${index + 1}`}
									items={data.answers}
									itemsTrue={data.trueAnswers}
									isValidate={radioGroupIsValudate}
									classPrefix="addQuestionForm__questionForm__radioGroup-list"
								/>
								<div className="addQuestionForm__questionForm__radioGroup-list-buttons">
								<Button
									name="Добавить вариант ответа"
									classPrefix="addQuestionForm__questionForm__radioGroup-button"
									handleAction={() => {
										handleQuestion(
											{ ...data, answers: [...data.answers, ""] },
											index
										)
									}}
								/>
									{data.answers.length !== 0 && <Button
									name="Удалить вариант ответа"
									classPrefix="addQuestionForm__questionForm__radioGroup-button"
									handleAction={() => {
										
										handleQuestion(
											{ ...data, answers: data.answers.filter((item, index) => index !== data.answers.length -1)},
											index
										)
									}}
								/>}
								</div>
							</div>
						)}

						{data.questionType === "ManyOfMany" && (
							<div className="addQuestionForm__questionForm__chechBoxGroup">
								<Label
									title="Ответы. Выберите верные варианты "
									classPrefix="addQuestionForm__questionForm__chechBoxGroup-text"
								/>
								<CheckBoxGroupForAddQuestion
									classPrefix="addQuestionForm__questionForm__chechBoxGroup-input"
									items={data.answers}
									itemsTrue={data.trueAnswers}
									onChange={onChange}
									onInput={onInput}
									isCheckBoxValidate={radioGroupIsValudate}
								/>
								<div className="addQuestionForm__questionForm__radioGroup-list-buttons">
								<Button
									name="Добавить вариант ответа"
									classPrefix="addQuestionForm__questionForm__radioGroup-button"
									handleAction={() =>
										handleQuestion(
											{
												...data,
												answers: [...data.answers, ""],
												trueAnswers: [...data.trueAnswers, null],
											},
											index
										)
									}
								/>
									{data.answers.length !== 0 && <Button
									name="Удалить вариант ответа"
									classPrefix="addQuestionForm__questionForm__radioGroup-button"
									handleAction={() =>
										handleQuestion(
											{
												...data,
												answers: data.answers.filter((item, index) => index !== data.answers.length -1),
											trueAnswers: data.trueAnswers.filter((item, index) => index !== data.trueAnswers.length -1)
											},
											index
										)
									}
								/>}
								</div>
							</div>
						)}
						{data.questionType === "InputText" && (
							<div className="addQuestionForm__questionForm__chechBoxGroup__inputText">
								<Label
									title="Ответ"
									classPrefix="addQuestionForm__questionForm__chechBoxGroup__inputText-label"
								/>
								<TextField
									placeholder="Введите верный ответ"
									value={data.answers[0]}
									classPrefix="addQuestionForm__questionForm__chechBoxGroup__inputText-textField"
									handleChange={(e) => {
										handleQuestion(
											{
												...data,
												answers: [e.target.value],
												trueAnswers: [e.target.value],
											},
											index
										)
									}}
									isBlur={(e) => {
										if (e.target.value.trim().length === 0) {
											setRadioGroupIsValudate(true)
										}
									}}
								/>
								{radioGroupIsValudate && (
									<span className="validateError">{emptyInput}</span>
								)}
							</div>
						)}
						<div className="addQuestionForm__questionForm__score">
							<Label
								title="Балл"
								classPrefix={"addQuestionForm__questionForm__score-text"}
							/>
							<TextField
								placeholder="2.4"
								classPrefix="addQuestionForm__questionForm__score-textField"
								type="number"
								handleChange={(e) => {
									handleQuestion(
										{ ...data, numberOfPoints: Math.floor(+e.target.value) },
										index
									)
									setNumberInputIsvalidate(false)
								}}
								value={`${data.numberOfPoints}`}
								isBlur={() => {
									if (!data.numberOfPoints) {
										setNumberInputIsvalidate(true)
									}
								}}
							/>
							{numberInputIsvalidate && (
								<span className="validateError">{incorrectValue}</span>
							)}
						</div>
					</div>
				</div>

				<div className="addQuestionForm__controlIcon">
					<Picture
						src={copyIcon}
						handleAction={() => {
							cloneQuestion(index)
						}}
						alt="Oops"
						title="Создать копию"
						classPrefix="addQuestionForm__controlIcon-copy"
					/>
					<Picture
						src={deleteIconBig}
						handleAction={() => removeQuestion(data.name)}
						alt="Oops"
						title="Удалить"
						classPrefix="addQuestionForm__controlIcon-delete"
					/>
				</div>
			</div>

			{uploadImage && (
				<Modal
					classPrefix="imgSelection__modal"
					isLogin={uploadImage}
					handleChanger={() => {
						dispatch(modalAction.ModalUploadImage(false))
						document.body.style.overflow = ""
					}}>
					<UploadPictureModal onLoadImg={onLoadImg} handleChange={() => {}} />
				</Modal>
			)}
		</section>
	)
}
