import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../../components/atoms/Button/Button";
import { Select } from "../../components/atoms/Select/Select";
import { HeaderEditComponent } from "../../components/molecules/HeaderEditComponent/HeaderEditComponent";
import { HeaderEditTest } from "../../components/molecules/HeaderEditTest/HeaderEditTest";
import { SectionNavigation } from "../../components/molecules/SectionNavigation/SectionNavigation";
import {
	dataEditCategorySelector,
	dataOptionsLevel,
} from "../../constants/links";
import { useHookDispatch, useHookSelector } from "../../store/reducers/redux";
import { selectAction } from "../../store/reducers/SelectReduser/SelectReduser";
import { SearchAnimation } from "../../components/atoms/SearchAnimation/SearchAnimation";
import { useNavigate } from "react-router";
import { ERoutes } from "../../constants/paths";
import { fetchCategoryId } from "../../api/FetchCategoryId/FetchCategoryId";
import { fetchTestsList } from "../../api/FetchTestsList/FetchTestsList";
import { editCategoryAction } from "../../store/reducers/EditCategoryEdit/EditCategoryEdit";
import { exportExelTemplate } from "../../api/FetchExportExelTemplate/fetchExportExelTemplate";
import "./style.css";
import { Modal } from "../../components/molecules/Modal/Modal";
import { modalAction } from "../../store/reducers/modalReduser/modalReducer";
import { ModalLoaderFile } from "../../components/organisms/ModalLoaderFile/ModalLoaderFile";
import { tabsAction } from "../../store/reducers/tabsReducer/tabsReducer";

export const EditCategory = () => {
	const href = useNavigate();
	const dispatch = useHookDispatch();

	const {
		testCatalog,
		allCatalog,
		actionPos,
		selectOptionTestsCatalogMiddle,
		selectOptionEditCategory,
		isLoaderFileTest,
	} = useHookSelector((state) => ({
		testCatalog: state.editCategoryReducer.testCatalog,
		allCatalog: state.editCategoryReducer.allCatalog,
		actionPos: state.editCategoryReducer.actionPos,
		isLoaderFileTest: state.modalReducer.isLoaderFileTest,
		selectOptionTestsCatalogMiddle:
			state.selectReducer.selectOptionTestsCatalogMiddle,
		selectOptionEditCategory: state.selectReducer.selectOptionEditCategory,
	}));

	const onSelectTitleLevelChoice = useCallback(
		(value: string, title: string) => {
			dispatch(selectAction.selectOptionTestsCatalogMiddle({ value, title }));
		},
		[dispatch]
	);

	const onSelectTitleTimeChoice = useCallback(
		(value: string, title: string) => {
			dispatch(selectAction.selectOptionEditCatalog({ value, title }));
		},
		[dispatch]
	);

	const [search, setSearch] = useState<string>("");

	const filterName = useMemo(
		() =>
			actionPos ? allCatalog.find((el) => el.id === actionPos) : allCatalog[0],
		[allCatalog, actionPos]
	);

	const searchTests = useMemo(
		() =>
			search
				? testCatalog.filter((test) => test.name.toLowerCase().includes(search))
				: testCatalog,
		[search, testCatalog]
	);

	const fil = useMemo(
		() =>
			testCatalog.filter(
				(test) =>
					(selectOptionTestsCatalogMiddle.value !== ""
						? selectOptionTestsCatalogMiddle.value.includes(test.testLevel)
						: true) &&
					(selectOptionEditCategory.value !== ""
						? selectOptionEditCategory.value.includes(`${test.isTestOnTime}`)
						: true) &&
					(selectOptionEditCategory.value !== ""
						? selectOptionEditCategory.value.includes(`${test.isTestOnTime}`)
						: true)
			),
		[testCatalog, selectOptionTestsCatalogMiddle, selectOptionEditCategory]
	);

	const onSearch = (value: string) => {
		setSearch(value);
	};

	useEffect(() => {
		if (filterName) {
			localStorage.setItem("categoryId", filterName.id);
			dispatch(fetchTestsList(filterName.id));
			dispatch(fetchCategoryId(filterName.id));
			dispatch(editCategoryAction.selectCategory(filterName.id));
		}
	}, [dispatch, filterName]);
	const dowloadFile = () => {
		exportExelTemplate();
	};
	return (
		<>
			<div className="editCategory__container">
				<div className="editCategory__header">
					<SectionNavigation />
					<div className="editCategory__tests">
						<div className="editCategory__tests__background">
							{filterName && (
								<HeaderEditComponent
									imageUrl={filterName.imageUrl}
									name={filterName.name}
									description={filterName.description}
									cntTest={filterName.cntTest}
								/>
							)}
						</div>
						{allCatalog.length ? (
							<div className="editCategory__tests-sort">
								<div className="editCategory__buttons">
									<Button
										name="Добавить тест"
										classPrefix="editCategory__tests-sort-button"
										handleAction={() => {
											dispatch(tabsAction.addQuestionType("Test"));
											href(ERoutes.createTest);
										}}
									/>
									<Button
										name="Загрузить тест"
										classPrefix="editCategory__tests-sort-button white"
										handleAction={() => {
											dispatch(modalAction.ModalIsLoaderFileTest(true));
											document.body.style.overflow = "hidden";
										}}
									/>
									<Button
										classPrefix="white"
										name="Скачать шаблон"
										handleAction={() => {
											dowloadFile();
										}}
									/>
								</div>
								<div className="editCategory__tests-selects">
									<SearchAnimation onSearch={onSearch} search={search} />
									<Select
										classPrefix="editCategory__tests__selects-style"
										titleDefault="Уровень"
										title={selectOptionTestsCatalogMiddle.title}
										dataList={dataOptionsLevel}
										setOptionTitle={onSelectTitleLevelChoice}
									/>
									<Select
										classPrefix="editCategory__tests__selects-style"
										titleDefault="Время"
										title={selectOptionEditCategory.title}
										dataList={dataEditCategorySelector}
										setOptionTitle={onSelectTitleTimeChoice}
									/>
								</div>
							</div>
						) : (
							<></>
						)}
						{allCatalog.length ? (
							<div className="editCategory__tests-list">
								{fil.length ? (
									fil.map((el) => (
										<HeaderEditTest
											key={el.id}
											id={el.id}
											picture={el.imageUrl}
											title={el.name}
											description={el.description}
											numberOfQuestion={el.cntQuestion}
											complexity={el.testLevel}
											duration={el.timeForTest}
										/>
									))
								) : (
									<span className="emptiness">Таких тестов нет</span>
								)}
							</div>
						) : (
							<span className="emptiness">
								Нажмите на + чтобы добавить раздел
							</span>
						)}
					</div>
				</div>
			</div>
			{isLoaderFileTest && (
				<Modal
					isLogin={isLoaderFileTest}
					handleChanger={() => {
						dispatch(modalAction.ModalIsLoaderFileTest(false));
						document.body.style.overflow = "";
					}}>
					<ModalLoaderFile />
				</Modal>
			)}
		</>
	);
};
