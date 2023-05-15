import { ProfileCard } from "../../molecules/ProfileCard/ProfileCard"
import { ProfileTestCard } from "../../molecules/ProfileTestCard/ProfileTestCard"
import { titleStoryTest } from "../../../constants/links"
import { ProgressCard } from "../../atoms/ProgressCard/ProgressCard"
import { ProfileCardPassingTests } from "../../molecules/ProfileCardPassingTests/ProfileCardPassingTests"
import { useHookDispatch, useHookSelector } from "../../../store/reducers/redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { fetchGetAllResultByUser } from "../../../api/fetchGetAllResultByUserId/fetchGetAllResultByUseId"

export const ProfileItems = () => {
	const dispatch = useHookDispatch()
	const {id} = useParams()
	const {allResultByUser} = useHookSelector(state => state.resultTestReduser)


	useEffect(()=>{
		if(id !== undefined){
			dispatch(fetchGetAllResultByUser(id))
		}
	},[id])
	return (
		<>
			<div className="profile__header">
				<ProfileCard />
				<ProfileCardPassingTests/>
			</div>
			<ProgressCard />
			<div className="margin-40">
				<ProfileTestCard
					title="История тестов"
					classPrefix="profileStory"
					className="profileStory__table-body"
					titleTable={titleStoryTest}
					infoTest={allResultByUser}
				/>
			</div>
		</>
	)
}