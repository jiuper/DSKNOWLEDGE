import { Link } from "../Link/Link"
import { item, items } from "../../../constants/links"
import defaultAvatar from "../../../assets/images/user-male.svg"
import { Picture } from "../Picture/Picture"
import { useHookSelector } from "../../../store/reducers/redux"

import "./style.css"


export const MenuActionUser = () => {

	const { loginListsData } = useHookSelector(state => state.isAuthReducer)

	return (
		<div className="user-bar">
			<Picture src={loginListsData?.iconUrl || defaultAvatar} classPrefix="vremanka_2" />
			<div className="menu-drop">
				<div className="menu-drop__header">
					<Picture src={loginListsData?.iconUrl || defaultAvatar} classPrefix="vremanka_2" />
					<div className="menu-drop__info">
						<span className="menu-drop__user">{`${loginListsData?.firstName} ${loginListsData?.lastName} `}</span>
						<span className="menu-drop__status">{`${loginListsData?.roleName}`}</span>
					</div>
				</div>
				<div className="menu-drop__list">
					{loginListsData?.roleName === "Admin"
						? item.map(item => (
							<Link classPrefix="menu-drop__item" key={item.title} href={item.href} title={item.title} />
						))
						: items.map(item => (
							<Link classPrefix="menu-drop__item" key={item.title} href={item.href} title={item.title} />
						))
					}
				</div>
			</div>
		</div>
	)
}
