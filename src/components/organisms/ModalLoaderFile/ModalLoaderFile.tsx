import { Label } from "../../atoms/Label/Label"
import { modalAction } from "../../../store/reducers/modalReduser/modalReducer"
import { useHookDispatch } from "../../../store/reducers/redux"
import "./style.css"
import { TextField } from "../../atoms/TextField/TextField"
import { Button } from "../../atoms/Button/Button"
import { useEffect, useState } from "react"
import { fetchUploadTest } from "../../../api/FetchUploadTest/fetchUpladTest"

export const ModalLoaderFile = () => {
	const dispatch = useHookDispatch()

	const [file, setFile] = useState<File>()
	const [error, setError] = useState<string>("")

	const onFileUpload = () => {
		if (file) {
			const formData = new FormData()
			formData.append("file", file)
			fetchUploadTest(formData)
			dispatch(modalAction.ModalIsLoaderFileTest(false))
			document.body.style.overflow = ""
			setError("")
		} else {
			setError("modal__error")
		}
	}

	useEffect(() => {
		if (file) setError("")
	}, [file])

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFile(e.target.files[0])
		}
	}

	return (
		<div className="modal__loader">
			<div className="modal__loader-title">
				<Label title="Загрузить файл" />
			</div>
			{error && (
				<span style={{ fontSize: 16, color: "red" }}>Пустое поле!</span>
			)}
			<div>
				<TextField
					type="file"
					handleChange={handleFileChange}
					classPrefix={error}
				/>
				<div className="modal__loader-button">
					<Button
						name="Отмена"
						handleAction={() => {
							dispatch(modalAction.ModalIsLoaderFileTest(false))
							document.body.style.overflow = ""
						}}
						classPrefix="deleteSectionModal__buttonGroup-CancelButton"
					/>
					<Button
						name="Загрузить"
						handleAction={onFileUpload}
						classPrefix="deleteSectionModal__buttonGroup-DeletelButton"
					/>
				</div>
			</div>
		</div>
	)
}
