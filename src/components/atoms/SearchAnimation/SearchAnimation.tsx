import { Picture } from "../Picture/Picture"
import { useState } from "react"
import { TextField } from "../TextField/TextField"
import searchIcon from "../../../assets/images/search.svg"
import close from "../../../assets/images/close.svg"
import "./style.css"

interface ISearchAnimation {
	onSearch: (value: string) => void
	search	: string
}

export const SearchAnimation = ({ onSearch ,search  }: ISearchAnimation) => {

	const [activ, setActive] = useState<boolean>(false)

	return (
		<>
			<Picture
				classPrefix={`${activ ? "serch-anim__isactive" : "serch-anim"}`}
				src={searchIcon}
				handleAction={() => setActive(!activ)}
			/>
			<div className={`${activ ? "serch-anim__visible" : "serch-anim__hidden"}`}>
				<TextField
					classPrefix="serch-anim__field"
					value={search}
					handleChange={(e) => onSearch(e.target.value)}
				/>
				<Picture
					classPrefix="serch-anim__close"
					src={close}
					handleAction={() => setActive(!activ)}
				/>
			</div>
		</>
	)
}
