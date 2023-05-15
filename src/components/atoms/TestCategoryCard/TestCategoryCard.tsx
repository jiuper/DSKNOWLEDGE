import { ICatalogTestPage } from "../../../types/type"
import { Picture } from "../Picture/Picture"
import { ERoutes } from "../../../constants/paths"
import { useNavigate } from "react-router-dom"

import pictures from "../../../assets/images/heart.png"

import "./style.css"

export const TestCategoryCard = ({
																	 name,
																	 description,
																	 cntTest,
																	 imageUrl,
																	 tests,
																	 id,
																	 updatedDate,
																	 createdDate
																 }: ICatalogTestPage) => {
	const href = useNavigate()

	const hrefCatalog = () => {
		href(ERoutes.testCategory + `/${id}`)
	}

	return (
		<div className="test-card" onClick={hrefCatalog}>
			<div className="test-card__wrapper">
				<Picture classPrefix="test-card__img" src={imageUrl || pictures} alt="Heart" />
				<div className="test-card__content">
					<h6 className="test-card__title">{name}</h6>
					<p className="test-card__text">
						{description}
					</p>
					<span className="test-card__count">{cntTest} тестов</span>
				</div>
			</div>
		</div>
	)
}
