import { Picture } from "../Picture/Picture"
import { IButtonType } from "../../../types/type"
import "./IconButton.css"

interface IIconButton extends IButtonType {
	icon: string
}

export const IconButton = ({
	disabled = false,
	classPrefix,
	name,
	icon,
	handleAction,
}: IIconButton) => {
	return (
		<button disabled={disabled} className={classPrefix} onClick={handleAction}>
			{name}
			<Picture src={icon} />
		</button>
	)
}
