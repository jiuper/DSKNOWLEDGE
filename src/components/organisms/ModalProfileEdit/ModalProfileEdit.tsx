import "./style.css"
import { Label } from "../../atoms/Label/Label"
import { Picture } from "../../atoms/Picture/Picture"
import close from "../../../assets/images/close-icon.svg"
import { modalAction } from "../../../store/reducers/modalReduser/modalReducer"
import { useHookDispatch, useHookSelector } from "../../../store/reducers/redux"
import { useState } from "react"
import { IModalProfileEdit, IRespProfileInfo } from "../../../types/type"
import { ModalProfileEditItem } from "./ModalProfileEditItem"
import { Button } from "../../atoms/Button/Button"
import { BackgroundIcon } from "../../atoms/BackgroundIcon/BackgroundIcon"
import { fetchUserDate } from "../../../api/FetchUserData/fetchUserDate"
import { fetchEditProfile } from "../../../api/fetchEditProfile/fetchEditProfile"
import { Modal } from "../../molecules/Modal/Modal"
import { UploadPictureModal } from "../../molecules/UploadPictureModal/UploadPictureModal"
import { BoxImgItemType } from "../../atoms/BoxImgList/BoxImgItem"

interface IEditList {
	title: string;
	value: string;
	disabled: boolean;
	columns: string
}

export const ModalProfileEdit = ({
	firstName,
	id,
	lastName,
	surName,
	organization,
	specialization,
	email,
	phoneNumber,
	token,
	iconUrl,
}: IRespProfileInfo) => {

	const dispatch = useHookDispatch()

	const { uploadImage } = useHookSelector(state => state.modalReducer)

	const [userEdit, setUserEdit] = useState<IModalProfileEdit>({
		id: id,
		surName: surName,
		firstName: firstName,
		lastName: lastName,
		email: email,
		phoneNumber: phoneNumber,
		specialization: specialization,
		organization: organization,
		token: token,
		iconUrl: iconUrl
	})

	const pictureLoad = (value: BoxImgItemType) => {
		setUserEdit({ ...userEdit, iconUrl: value.src === undefined ? "" : value.src })


	}

	const handleModal = () => {
		dispatch(modalAction.ModalUploadImage(true));
		document.body.style.overflow = "hidden"
	}

	const editProfileUser = () => {
		fetchEditProfile(userEdit).then(resp => dispatch(fetchUserDate(id)))
		dispatch(modalAction.ModalIsProfileEdit(false))
		document.body.style.overflow = ""
	}

	const onChangeUser = (title: string, value: string) => {
		setUserEdit({ ...userEdit, [title]: value })
	}

	const editList: IEditList[] = [
		{ title: "Имя", value: userEdit.firstName, columns: "firstName", disabled: true },
		{ title: "Фамилия", value: userEdit.surName, columns: "surName", disabled: true },
		{ title: "Отчество", value: userEdit.lastName, columns: "lastName", disabled: true },
		{ title: "Организация", value: userEdit.specialization, columns: "educationName", disabled: true },
		{ title: "Специализация", value: userEdit.organization, columns: "university", disabled: true },
		{ title: "Email", value: userEdit.email, columns: "email", disabled: false },
		{ title: "Номер телефона", value: userEdit.phoneNumber, columns: "phoneNumber", disabled: false }
	]

	return (
		<div className="profile__edit-modal">
			<div className="profile__edit-title">
				<Label
					title="Редактировать профиль"
				/>
				<Picture
					src={close}
					alt="close"
					classPrefix="modal__close"
					handleAction={() => {
						dispatch(modalAction.ModalIsProfileEdit(false))
						document.body.style.overflow = ""
					}}
				/>
			</div>

			<div className="profile__edit-body">
				<div className="profile__edit-items">
					{
						editList.map(el =>
							<ModalProfileEditItem
								key={el.columns}
								disabled={el.disabled}
								onChangeUser={onChangeUser}
								value={el.value}
								columns={el.columns}
								title={el.title} />
						)
					}
				</div>

				<div className="profile__edit-img">
					<BackgroundIcon classPrefix="image--profile" src={userEdit.iconUrl} alt="" />
					<span className="inpitFile--profile" onClick={handleModal} >Изменить фотографию</span>
				</div>

			</div>
			<div className="profile__edit-footer">
				<Button
					classPrefix="buttons__back buttonst__transparent"
					name="Отмена"
					handleAction={() => {
						dispatch(modalAction.ModalIsProfileEdit(false))
						document.body.style.overflow = ""
					}}
				/>
				<Button classPrefix="buttons__start" name="Сохранить" handleAction={editProfileUser} />
			</div>
			{ uploadImage && <Modal
				isLogin={uploadImage}
				handleChanger={() => { dispatch(modalAction.ModalUploadImage(false)); document.body.style.overflow = "" }}
			>
				<UploadPictureModal
					handleChange={() => { }}
					onLoadImg={pictureLoad}
				/>
			</Modal>}
		</div>





	)
}
