import { useHookSelector } from "../../../store/reducers/redux";
import { CreateTestHeader } from "../../molecules/CreateTestHeader/CreateTestHeader";
import { useParams } from "react-router-dom";
import { useCheck } from "../../../hooks/useCheck";
import { TestSectionAction } from "../../molecules/TestSectionAction/TestSectionAction";

import "./style.css";
import { useFormLogin } from "../LoginForm/useFormLogin";

export interface ICreateTest {
	id?: string;
	name: string;
	description: string;
	imageUrl: string;
}

export const CreateTestSection = () => {
	const { categoryId } = useHookSelector((state) => state.categoryIdReducer);
	const { id } = useParams();

	const varCategory =
		id && categoryId
			? categoryId
			: {
					id: "",
					name: "",
					description: "",
					imageUrl: "",
			  };



	const { obj, status, error, handler, blur } = useCheck(varCategory)
	
		
	return (
		<div className="create-tests">
			<CreateTestHeader
				title={id ? "Редактирование раздела" : "Добавление раздела"}
				buttonName={id ? "Сохранить" : "Создать"}
				sectionState={obj}
				status={status}
			/>
			<TestSectionAction
				id={id}
				sectionState={obj}
				handleChange={handler}
				isBlur={(e) => blur(e, "Поля не могут быть пустыми!")}
				error={error}
			/>
		</div>
	);
};
