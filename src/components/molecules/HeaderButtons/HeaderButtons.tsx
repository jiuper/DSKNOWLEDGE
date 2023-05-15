import { Button } from "../../atoms/Button/Button"
import { ERoutes } from "../../../constants/paths"
import { useNavigate } from "react-router"

export const HeaderButtons = () => {

	const href = useNavigate()

	return (
		<div className="header__buttons">
			<Button
				disabled={false}
				handleAction={() => {
					href(ERoutes.reget)
				}}
				name="Регистрация"
				classPrefix="header_singup__button"
			/>
			<Button
				disabled={false}
				handleAction={() => href(ERoutes.login)}
				name="Вход"
				classPrefix="header_singin__button"
			/>
		</div>
	)
}
