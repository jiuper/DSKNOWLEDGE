import { useState } from "react"
import { modalAction } from "../../../store/reducers/modalReduser/modalReducer"
import { useHookDispatch } from "../../../store/reducers/redux"
import { Button } from "../../atoms/Button/Button"
import { InputFile } from "../../atoms/InputFile/InputFile"
import { Label } from "../../atoms/Label/Label"
import { TextField } from "../../atoms/TextField/TextField"
import "./style.css"
import { BoxImgItemType } from "../../atoms/BoxImgList/BoxImgItem"

export const UploadPictureModal = ({
																		 onLoadImg,
																		 handleChange
																	 }: { onLoadImg: (value: BoxImgItemType) => void, handleChange: (title: string, value: string) => void }) => {

	const dispatch = useHookDispatch()
	const [value, setValue] = useState<BoxImgItemType>({
		id: `${Date.now() + 1}`,
		src: "",
		alt: ""
	})

	const isLoader = () => {
		onLoadImg(value)
		if (value.src)
			handleChange("imageUrl", value.src)
		setValue({ id: `${Date.now() + 1}`, src: "", alt: "" })
		dispatch(modalAction.ModalUploadImage(false))
		document.body.style.overflow = ""
	}

	return (
		<section className="uploadPictureModal__container">
			<div className="uploadPictureModal__textContent">
				<Label
					title="Загрузка изображения"
					classPrefix="uploadPictureModal__textContent-title"
				/>
				<div className="uploadPictureModal__textContent__loader">
					<Label
						title="Вставьте URL"
						classPrefix="uploadPictureModal__textContent__loader-title"
					/>
					<TextField
						value={value.src}
						disabled={false}
						handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue({ ...value, src: e.target.value })}
						classPrefix="uploadPictureModal__textContent__loader-input"
					/>
					<div className="uploadPictureModal__textContent__loader__caption">
						<Label
							title="или"
							classPrefix="uploadPictureModal__textContent__loader__caption-text"
						/>
						<InputFile classPrefix="uploadPictureModal__textContent__loader__caption-buttop"
											 title="Загрузить с компьютера" />
					</div>
				</div>
			</div>
			<div className="uploadPictureModal__buttonGroup">
				<Button
					classPrefix="uploadPictureModal__buttonGroup-cancelButton"
					name="Отмена"
					handleAction={() => {
						dispatch(modalAction.ModalUploadImage(false))
						document.body.style.overflow = ""
					}}
				/>
				<Button
					classPrefix="uploadPictureModal__buttonGroup-acceptButton"
					name="Загрузить"
					handleAction={isLoader}
				/>
			</div>
		</section>
	)
}
