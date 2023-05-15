import React from "react"
import { Label } from "../../atoms/Label/Label"
import { TextField } from "../../atoms/TextField/TextField"

interface IModalProfileEditItem {
	onChangeUser: (title: string, value: string) => void
	value: string
	columns: string
	title: string
	disabled:boolean
}

export const ModalProfileEditItem = ({disabled, title, columns, onChangeUser, value }: IModalProfileEditItem) => {
	return (
		<div className="profile__edit-item">
			<Label title={title} />
			<TextField
				disabled={disabled}
				value={value}
				classPrefix='item__width'
				handleChange={(e) => {
					onChangeUser(columns, e.target.value)
				}}
			/>
		</div>
	)
}
