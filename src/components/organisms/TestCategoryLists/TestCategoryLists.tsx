import { TestCategoryCard } from "../../atoms/TestCategoryCard/TestCategoryCard"
import { ICatalogTestPage } from "../../../types/type"

export const TestCategoryLists = ({ test }: { test: ICatalogTestPage[] }) => {

	return (
		<>
			{
				test.map(item => (
						<TestCategoryCard
							createdDate={item.createdDate}
							key={item.id}
							id={item.id}
							name={item.name}
							description={item.description}
							cntTest={item.cntTest}
							tests={item.tests}
							imageUrl={item.imageUrl}
							updatedDate={item.updatedDate}
						/>
					)
				)
			}
		</>
	)
}