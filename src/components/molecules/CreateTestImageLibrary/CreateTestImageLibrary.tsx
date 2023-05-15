import { BoxImgList } from "../../atoms/BoxImgList/BoxImgList"
import { InputFile } from "../../atoms/InputFile/InputFile"
import { BackgroundIcon } from "../../atoms/BackgroundIcon/BackgroundIcon"
import { BoxImgItemType } from "../../atoms/BoxImgList/BoxImgItem"
import { useHookDispatch, useHookSelector } from "../../../store/reducers/redux"
import { useMemo, useState } from "react"
import { UploadPictureModal } from "../UploadPictureModal/UploadPictureModal"
import { Modal } from "../Modal/Modal"
import { modalAction } from "../../../store/reducers/modalReduser/modalReducer"
import "./style.css"

interface ICreateTestImageLibrary {
	handleChange: (title: string, value: string) => void
	imageUrl?: string
}

export const CreateTestImageLibrary = ({
	handleChange,
	imageUrl,
}: ICreateTestImageLibrary) => {
	const [loadImg, setLoadImg] = useState<BoxImgItemType[]>([])

	const onLoadImg = (value: BoxImgItemType) => {
		setLoadImg([...loadImg, value])
	}

	const { id } = useHookSelector((state) => state.imageSelectReduser)
	const item = useMemo(() => loadImg.find((item) => item.id === id), [id])

	const { uploadImage } = useHookSelector((state) => state.modalReducer)
	const dispatch = useHookDispatch()

	const handleModal = () => {
		dispatch(modalAction.ModalUploadImage(true))
		document.body.style.overflow = "hidden"
	}

	return (
		<div className="imgSelection">
			<div className="imgSelection__main">
				<span className="imgSelection__title">Изображение</span>
				<div className="imgSelection__picture">
					{id ? (
						<BackgroundIcon
							classPrefix="imgSelection__background"
							src={imageUrl === "" ? item?.src : imageUrl}
							alt={item?.src}
						/>
					) : (
						<InputFile classPrefix="imgSelection__background" />
					)}
				</div>
			</div>
			<div className="imgSelection__choice">
				<span className="imgSelection__title">Библиотека</span>
				<BoxImgList classPrefix="imgSelection__box" imgList={loadImg} />
				<span className="imgSelection__input" onClick={handleModal}>
					Загрузить ещё
				</span>
			</div>

			{uploadImage && (
				<Modal
					classPrefix="imgSelection__modal"
					isLogin={uploadImage}
					handleChanger={() => {
						dispatch(modalAction.ModalUploadImage(false))
						document.body.style.overflow = ""
					}}
				>
					<UploadPictureModal
						onLoadImg={onLoadImg}
						handleChange={handleChange}
					/>
				</Modal>
			)}
		</div>
	)
}
