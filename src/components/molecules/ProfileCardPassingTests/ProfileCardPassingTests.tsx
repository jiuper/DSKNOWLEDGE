import { Label } from "../../atoms/Label/Label"
import "./style.css"
import { ProfileCardPassingTestsBody } from "../ProfileCardPassingTestsBody/ProfileCardPassingTestsBody"
import { ProfileCardPassingTestsHeader } from "../ProfileCardPassingTestsHeader/ProfileCardPassingTestsHeader"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { fetchGetAllResultByUser } from "../../../api/fetchGetAllResultByUserId/fetchGetAllResultByUseId"
import { useHookDispatch, useHookSelector } from "../../../store/reducers/redux"
import { ERoutes } from "../../../constants/paths"

export const ProfileCardPassingTests = () => {
	const dispatch = useHookDispatch()
	const { allResultByUser } = useHookSelector(
		(state) => state.resultTestReduser
	)
	const { id } = useParams()

	useEffect(() => {
		if (id) {
			dispatch(fetchGetAllResultByUser(id))
		}
	}, [id])

	return (
		<div className="profile">
			<div className="profile__title">
				<Label title="Назначенные тесты" />
			</div>
			<div className="profile__content">
				<div className="profile__content-header">
					<ProfileCardPassingTestsHeader />
				</div>
				<div className="profile__table-items">
					{/* {allResultByUser.map((el) =>
						<ProfileCardPassingTestsBody
							key={el.id}
							date={el.dateOfPassage.split(" ")[0]}
							nameCatalog={el.categoryName}
							nameTest={el.testName}
							progress={el.score}
							status={el.status}
							replace={"перейти"}
							href={ERoutes.resultTestPage + `/${el.id}`}
						/>)
					} */}
					В разработке...
				</div>
			</div>
		</div>
	)
}
