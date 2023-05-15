import { Header } from "../../components/template/Header/Header"
import { Footer } from "../../components/template/Footer/Footer"
import { Tabs } from "../../components/molecules/Tabs/Tabs"
import { pathProfile } from "../../constants/links"
import { BreadCrumbs } from "../../components/atoms/BreadCrumbs/BreadCrumbs"
import { breadCrumbs, ERoutes } from "../../constants/paths"
import { ProfileItems } from "../../components/organisms/ProfileItems/ProfileItems"
import { ProfileResultsTest } from "../../components/organisms/ProfileResultsTest/ProfileResultsTest"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router"
import { useHookSelector } from "../../store/reducers/redux"
import { tabsAction } from "../../store/reducers/tabsReducer/tabsReducer"
import { Button } from "../../components/atoms/Button/Button"

export const Profile = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const { loginListsData } = useHookSelector((state) => state.isAuthReducer)

	const { selectedProfileType } = useHookSelector((state) => state.tabsReducer)
	const isDispatch = tabsAction.profileType
	const { pathname } = useLocation()
	const href = useNavigate()

	useEffect(() => {
		if (!id) {
			navigate(`${ERoutes.profile}/${loginListsData?.id}`)
		}
	}, [id])

	return (
		<>
			<Header />
			<div className="container">
				<BreadCrumbs paths={breadCrumbs[pathname.split("/")[1]]} />
				<div className="profile__headerTabs">
					<Tabs
						isDispatch={isDispatch}
						isActiveType={selectedProfileType}
						tabs={pathProfile}
					/>
					<Button
						name="Каталог тестов"
						handleAction={() => href(ERoutes.tests)}
						classPrefix="header_singup__button buttonTest"
					/>
				</div>
				<div className="profileInfo">
					{selectedProfileType !== "isProfile" ? (
						<ProfileResultsTest />
					) : (
						<ProfileItems />
					)}
				</div>
			</div>
			<Footer />
		</>
	)
}
