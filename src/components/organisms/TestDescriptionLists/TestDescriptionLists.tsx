import { Carousel } from "../../molecules/Carousel/Carousel"
import { InfoItem } from "../../atoms/InfoItem/InfoItem"
import { ITestsCatalogPage } from "../../../types/type"
import { useHookSelector } from "../../../store/reducers/redux"
import { useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"

interface ITestDescriptionList {
	infoDB: ITestsCatalogPage[]
}

export const TestDescriptionList = ({ infoDB }: ITestDescriptionList) => {
	const { catalogNameId } = useParams()

	const initVal = useMemo(
		() => infoDB.findIndex((el) => el.id === catalogNameId),
		[catalogNameId, infoDB]
	)
	return (
		<>
			<Carousel
				classPrefix="slider"
				width={854}
				length={infoDB.length - 1}
				initionalValue={initVal}>
				{infoDB.map((item) => (
					<InfoItem
						key={item.id}
						id={item.id}
						category={item.category}
						description={item.description}
						timeForTest={item.timeForTest}
						cntQuestion={item.cntQuestion}
						testLevel={item.testLevel}
						imageUrl={item.imageUrl}
						score={item.score}
						threshold={item.minThreshold}
						questions={item.questions}
						name={item.name}
						isTestOnTime={item.isTestOnTime}
						updateDate={item.updateDate}
						createdDate={item.createdDate}
						categoryId={item.categoryId}
					/>
				))}
			</Carousel>
		</>
	)
}
