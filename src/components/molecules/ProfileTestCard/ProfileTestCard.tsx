import { Label } from "../../atoms/Label/Label"
import { ProfileTableHeader } from "../../atoms/ProfileTableHeader/ProfileTableHeader"
import { ITestQustion, ITitleTable } from "../../../types/type"
import { ProfileTableBody } from "../../atoms/ProfileTableBody/ProfileTableBody"
import { ERoutes } from "../../../constants/paths"
import { SkeletonProfileTableBody } from "../../atoms/SkeletonProfileTableBody/SkeletonProfileTableBody"
import { useHookSelector } from "../../../store/reducers/redux"

import "./style.css"

interface IProfileTestCard {
	title?: string;
	titleTable: ITitleTable[]
	infoTest: ITestQustion[]
	classPrefix?: string;
	className?: string;
}

export const ProfileTestCard = ({ title = "", titleTable, infoTest, classPrefix = 'padding', className = 'padding' }: IProfileTestCard) => {

	const isLoading = useHookSelector(state => state.resultTestReduser.isLoading)
	const skeletons = Array(4).fill("")

	return (
		<div className={`${classPrefix}`}>
			<div className="profile__title padding">
				<Label title={title} />
			</div>
			<div className="profile__table">
				<div className="profile__table-header">
					<div className="title__item">
						{
							titleTable.map((el, i) => <ProfileTableHeader
								key={i}
								title={el.title}
								classPrefix={el.classPrefix}
							/>)
						}
					</div>
				</div>
				<div className={`${className}`}>
					{
						!isLoading && infoTest ?
							infoTest.length ? 
							infoTest.map((el) =>
								<ProfileTableBody
									key={el.id}
									date={el.dateOfPassage.split(" ")[0]}
									nameCatalog={el.categoryName}
									nameTest={el.testName}
									progress={el.score}
									time={el.timeSpent}
									countQue={el.cntQuestion}
									status={el.status}
									replace={"перейти"}
									href={ERoutes.resultTestPage + `/${el.id}`}
									classPrefix={""}
									classPrefixItem={""}
								/>) :
								<div className="emptiness resultEmptines">Результаты не найдены</div> :
							skeletons.map((skeleton, i) => <SkeletonProfileTableBody key={i} />)
					}
				</div>
			</div>
		</div>
	)
}
