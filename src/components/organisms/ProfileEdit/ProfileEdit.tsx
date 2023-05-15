import { useState } from "react"

interface IProfileEditState {
	fio: string,
	company: string;
	profession: string;
	email: string;
	phone: string;
}

export const ProfileEdit = () => {

	const [userEdit, setUserEdit] = useState<IProfileEditState>()

	return (
		<>
		</>
	)
}
