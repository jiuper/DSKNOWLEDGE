import { Logo } from "../../atoms/Logo/Logo"
import { MenuActions } from "../../atoms/MenuActions/MenuActions"
import { HeaderButtons } from "../../molecules/HeaderButtons/HeaderButtons"
import { useHookDispatch, useHookSelector } from "../../../store/reducers/redux"
import { fetchSearchTest } from "../../../api/FetchSearchTest/FetchSearchTest"
import { searchTestsAction } from "../../../store/reducers/SearchTestsReducer/SearchTestsReducer"
import { tabsAction } from "../../../store/reducers/tabsReducer/tabsReducer"

import "./style.css"

interface IHeader {
	auth?: boolean;
	active?: boolean;
	search?: boolean;
	mainSeacrh?: boolean;
	classPrefix?: string;
	searchClass?: string;
}

export const Header = ({
	auth = true,
	active = false,
	search = false,
	mainSeacrh = false,
	classPrefix,
	searchClass
}: IHeader) => {

	const dispatch = useHookDispatch()
	const { loginListsData } = useHookSelector(state => state.isAuthReducer)
	const { searchText } = useHookSelector(state => state.searchTestsReducer)

	const handleChange = (value: string) => {
		dispatch(searchTestsAction.searchText(value));

		if (value) {
			dispatch(fetchSearchTest(value))
		} else {
			dispatch(searchTestsAction.setSearchText());
			dispatch(tabsAction.serchTestsType("Все"))
		}
	}

	return (
		<header className="header">
			<div className={`header__content container ${classPrefix}`}>
				{!active && <Logo />}
				{search ?
					<input
						className={searchClass}
						value={searchText}
						placeholder="Найти тест"
						onChange={(e) => handleChange(e.target.value)}
					/>
					: ""
				}
				{auth && loginListsData && (<MenuActions hidden={search} mainHidden={mainSeacrh} />)}
				{auth && !loginListsData && (<HeaderButtons />)}
			</div>
		</header>
	)
}
