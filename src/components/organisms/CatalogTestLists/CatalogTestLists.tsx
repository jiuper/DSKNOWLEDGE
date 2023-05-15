import { ITestsCatalogPage } from "../../../types/type";
import { CatalogCard } from "../../atoms/CatalogCard/CatalogCard";

interface ICatalogTestLists {
	catalogTestData: ITestsCatalogPage[];
}

export const CatalogTestLists = ({ catalogTestData }: ICatalogTestLists) => {
	return (
		<>
			{catalogTestData.map((el) => (
				<CatalogCard
					categoryId={el.categoryId}
					key={el.id}
					id={el.id}
					category={el.category}
					imageUrl={el.imageUrl}
					minThreshold={el.minThreshold}
					description={el.description}
					cntQuestion={el.cntQuestion}
					testLevel={el.testLevel}
					score={el.score}
					timeForTest={el.timeForTest}
					questions={el.questions}
					name={el.name}
					isTestOnTime={el.isTestOnTime}
					createdDate={el.createdDate}
					updateDate={el.updateDate}
					categoryName={el.categoryName}
					testType={el.testType}
				/>
			))}
		</>
	);
};
