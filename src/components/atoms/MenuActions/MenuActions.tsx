import { MenuActionUser } from "../MenuActionUser/MenuActionUser"
import { MenuActionSearch } from "../MenuActionSearch/MenuActionSearch"
import { useHookSelector } from "../../../store/reducers/redux"

import "./style.css"

interface MenuActionsType {
	hidden: boolean,
	mainHidden: boolean,
}

export const MenuActions = ({ hidden, mainHidden }: MenuActionsType) => {

	const { loginListsData } = useHookSelector(state => state.isAuthReducer)

	return (
		<div className="profile-bar">
			{
				loginListsData?.roleName !== "Admin" ?
					<>{hidden || mainHidden ? "" : <MenuActionSearch />}</> :
					<></>
			}
			<MenuActionUser />
		</div>
	)
}
