import { IRespProfileInfo } from "../../../types/type"
import { Picture } from "../../atoms/Picture/Picture"
import defaultAvatar from "../../../assets/images//user-male.svg"

import "../../../App.css"

export const ProfileList = ({
	firstName,
	lastName,
	surName,
	organization,
	specialization,
	email,
	phoneNumber,
	iconUrl
}: IRespProfileInfo) => {

	const profileList = [
		{ title: "Имя", value: firstName },
		{ title: "Фамилия", value: surName },
		{ title: "Отчество", value: lastName },
		{ title: "Организация", value: organization },
		{ title: "Специализация", value: specialization },
		{ title: "Email", value: email },
		{ title: "Номер телефона", value: phoneNumber }
	]


	return (
		<>
			<div className="avatar">
				<Picture src={iconUrl || defaultAvatar} classPrefix="vremanka" />
			</div>
			<div className="item">
				{
					profileList.map(el =>
						<div key={el.title}>{el.title}
							<span>{el.value}</span>
						</div>)
				}
			</div>
		</>
	)
}
