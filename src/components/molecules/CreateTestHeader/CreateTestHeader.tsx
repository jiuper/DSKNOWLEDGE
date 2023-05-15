import { Button } from "../../atoms/Button/Button";
import { useNavigate } from "react-router";
import { ICreateTest } from "../../organisms/CreateTestSection/CreateTestSection";
import { fetchCreateCategory } from "../../../api/fetchCreateCategory/fetchCreateCategory";
import { fetchCatalogTest } from "../../../api/FetchCatalogTest/FetchCatalogTest";
import { fetchEditCategory } from "../../../api/fetchEditCategory/fetchEditCategory";

import "./style.css";

interface CreateTestHeaderType {
	title: string;
	buttonName: string;
	sectionState: ICreateTest;
	status: boolean,
}

export const CreateTestHeader = ({ title, buttonName, sectionState, status }: CreateTestHeaderType) => {
	const href = useNavigate();
	const handleCancellation = () => href("/adminPanel");

	
	const res = (response: number | boolean) => {
		if (response === 200) {
			fetchCatalogTest()
			href("/adminPanel")
		}
	}

	const onSumbit = (btnName: string) => {
		if (btnName === "Создать" && status) {
			fetchCreateCategory(sectionState)
				.then(response => res(response))
		} else if (btnName === "Сохранить" && status) {
			fetchEditCategory(sectionState)
				.then(response => res(response))
		} else {
			alert("Заполните поля")
		}
	};

	return (
		<div className="create-header">
			<h3 className="create-header__title">{title}</h3>
			<div className="create-header__buttons">
				<Button
					classPrefix="create-header__button_left"
					name="Отмена"
					handleAction={handleCancellation}
				/>
				<Button
					classPrefix="create-header__button_right"
					name={buttonName}
					type="submit"
					handleAction={() => onSumbit(buttonName)}
					disabled={!status}
				/>
			</div>
		</div>
	);
};
