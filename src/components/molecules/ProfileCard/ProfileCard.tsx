import { Label } from "../../atoms/Label/Label"
import { ProfileList } from "./ProfileList"
import "./style.css"
import { useHookDispatch, useHookSelector } from "../../../store/reducers/redux"
import iconButton from "../../../assets/images/Vec1tor.svg"
import { Modal } from "../Modal/Modal"
import { modalAction } from "../../../store/reducers/modalReduser/modalReducer"
import { ModalProfileEdit } from "../../organisms/ModalProfileEdit/ModalProfileEdit"

export const ProfileCard = () => {
	const { isProfileEdit, loginListsData } = useHookSelector((state) => ({
		loginListsData: state.isAuthReducer.loginListsData,
		isProfileEdit: state.modalReducer.isProfileEdit,
	}))
	const dispatch = useHookDispatch()

	return (
		<>
			<div className="profile">
				<div className="profile__title">
					<Label title="Личные данные" />
					<div
						className="profile__edit"
						onClick={() => {
							dispatch(modalAction.ModalIsProfileEdit(true))
							document.body.style.overflow = "hidden"
						}}
					>
						<img src={iconButton} alt="ooPs" />
						<label>Редактирование</label>
					</div>
				</div>
				<div className="profile__body">
					{loginListsData && <ProfileList {...loginListsData} />}
				</div>
			</div>

			{isProfileEdit && (
				<Modal
					handleChanger={() => {
						dispatch(modalAction.ModalIsProfileEdit(false))
						document.body.style.overflow = ""
					}}
					isLogin={isProfileEdit}
				>
					{loginListsData && <ModalProfileEdit {...loginListsData} />}
				</Modal>
			)}
		</>
	)
}
