import { BreadCrumbs } from "../../components/atoms/BreadCrumbs/BreadCrumbs";
import { EBreadCrumbs, ERoutes } from "../../constants/paths";
import { Header } from "../../components/template/Header/Header";
import { Footer } from "../../components/template/Footer/Footer";
import { Select } from "../../components/atoms/Select/Select";
import { dataOptions, dataOptionsLevel } from "../../constants/links";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { CatalogTestLists } from "../../components/organisms/CatalogTestLists/CatalogTestLists";
import { Modal } from "../../components/molecules/Modal/Modal";
import { Label } from "../../components/atoms/Label/Label";
import { Button } from "../../components/atoms/Button/Button";
import { useHookDispatch, useHookSelector } from "../../store/reducers/redux";
import { selectAction } from "../../store/reducers/SelectReduser/SelectReduser";
import { ILinks, ITestsCatalogPage } from "../../types/type";
import { modalAction } from "../../store/reducers/modalReduser/modalReducer";
import { fetchTestsList } from "../../api/FetchTestsList/FetchTestsList";
import { fetchCatalogTest } from "../../api/FetchCatalogTest/FetchCatalogTest";
import {
	sortSelect,
	testCatalogLevelFilter,
} from "../../function/selectActions/selectActions";
import { SkeletonTestsCategoryCard } from "../../components/organisms/SkeletonTestsCategoryCard/SkeletonTestsCategoryCard";
import "./style.css";
import { TestGeneralCategory } from "../../components/organisms/TestGeneralCategory/TestGeneralCategory";
import { fetchTestGeneraltoB } from "../../api/fetchTestGeneraltoB/fetchTestGeneraltoB";
import { testComponentAction } from "../../store/reducers/TestComponentReducer/testComponentReduser";

export const TestCategory = () => {
	const href = useNavigate();
	const dispatch = useHookDispatch();
	const { catalogName } = useParams();
	const {
		testsCatalog,
		testLists,
		isLoading,
		selectOptionTestsCatalogSmall,
		selectOptionTestsCatalogMiddle,
		isTestCategoryModalActive,
		isLoadingTest,
		loginListsData,
	} = useHookSelector((state) => ({
		testsCatalog: state.catalogTestReducer.testsCatalog,
		testLists: state.catalogTestReducer.testLists,
		isLoading: state.catalogTestReducer.isLoading,
		isLoadingTest: state.TestDescReducer.isLoading,
		selectOptionTestsCatalogSmall:
			state.selectReducer.selectOptionTestsCatalogSmall,
		selectOptionTestsCatalogMiddle:
			state.selectReducer.selectOptionTestsCatalogMiddle,
		isTestCategoryModalActive: state.modalReducer.isTestCategoryModalActive,
		loginListsData: state.isAuthReducer.loginListsData,
	}));
	const userData = localStorage.getItem("userData");
	const [testListsSort, setTestListsSort] = useState<ITestsCatalogPage[]>();
	const [totalNumberOfTest, setTotalNumberOfTest] = useState<number>(0);
	const filterName = useMemo(
		() => testLists.find((test) => test.id === catalogName)?.name,
		[testLists, catalogName]
	);

	const paths: ILinks[] = [
		{ href: ERoutes.main, title: EBreadCrumbs.HOME, separator: "/" },
		{ href: ERoutes.tests, title: "Тесты", separator: "/" },
		{ href: "#", title: filterName },
	];
	const onSelectSort = useCallback(
		(value: string, title: string) => {
			dispatch(selectAction.selectOptionTestsCatalogSmall({ value, title }));
		},
		[dispatch]
	);

	const onSelectFilter = useCallback(
		(value: string, title: string) => {
			dispatch(selectAction.selectOptionTestsCatalogMiddle({ value, title }));
		},
		[dispatch]
	);
	const onActionTestB = () => {
		if (userData && loginListsData) {
			dispatch(testComponentAction.isTestCommon(true));
			if (catalogName) dispatch(fetchTestGeneraltoB(catalogName));
			if (!isLoadingTest) href(ERoutes.testQustions);
		} else {
			document.body.style.overflow = "hidden";
			dispatch(modalAction.ModalChagerTestCalalog(true));
		}
	};
	const arrSkeleton = Array(4).fill("");

	useEffect(() => {
		dispatch(fetchCatalogTest());
		if (catalogName) {
			dispatch(fetchTestsList(catalogName));
		}
	}, [catalogName, dispatch]);

	const filterSelect = useMemo(
		() =>
			testCatalogLevelFilter(
				selectOptionTestsCatalogMiddle.value,
				testsCatalog
			),
		[selectOptionTestsCatalogMiddle.value, testsCatalog]
	);

	useEffect(() => {
		sortSelect({
			selectedField: selectOptionTestsCatalogSmall.title,
			dataForSorting: filterSelect,
			setFn: setTestListsSort,
		});
	}, [selectOptionTestsCatalogSmall, filterSelect]);

	useEffect(() => {
		setTotalNumberOfTest(
			testsCatalog.reduce(
				(accumulator, currentValue) => accumulator + +currentValue.cntQuestion,
				0
			)
		);
	}, [testsCatalog]);
	const examTestHandler = () => {
		document.body.style.overflow = "hidden";
		userData && loginListsData
			? dispatch(modalAction.ModalTestGeneralToTest(true))
			: dispatch(modalAction.ModalChagerTestCalalog(true));
	};
	return (
		<>
			<Header />
			<section className="catalog container">
				<BreadCrumbs paths={paths} />
				<div className="catalog__header">
					{<h4 className="catalog__title">{filterName}</h4>}
					<div className="catalog__selects">
						<Select
							classPrefix="catalog__select-level catalog__select-style"
							titleDefault="Уровень"
							title={selectOptionTestsCatalogMiddle.title}
							dataList={dataOptionsLevel}
							setOptionTitle={onSelectFilter}
						/>
						<Select
							classPrefix="catalog__select-choice catalog__select-style"
							title={selectOptionTestsCatalogSmall.title}
							dataList={dataOptions}
							setOptionTitle={onSelectSort}
						/>
					</div>
				</div>
				<div className="catalog__card">
					{!isLoading && testListsSort ? (
						testListsSort.length !== 0 ? (
							<>
								<TestGeneralCategory
									name="Общее тестирование по всему разделу"
									description="Будет сформирован тест из всех тестов в разделе без времени"
									onAction={onActionTestB}
									totalNumberOfTest={totalNumberOfTest}
								/>
								<TestGeneralCategory
									name="Экзаменационное тестирование по всему разделу"
									description="Вы можете самостоятельно выбрать количество заданий и время.
									Тестирование будет формировано из вопросов всех тестов в разделе."
									totalNumberOfTest={totalNumberOfTest}
									onAction={examTestHandler}
								/>
								<CatalogTestLists catalogTestData={testListsSort} />
							</>
						) : (
							<span className="emptiness">
								В данном разделе тестов пока не добавлено
							</span>
						)
					) : (
						arrSkeleton.map((el, i) => <SkeletonTestsCategoryCard key={i} />)
					)}
				</div>

				{isTestCategoryModalActive && (
					<Modal
						isLogin={isTestCategoryModalActive}
						handleChanger={() => {
							dispatch(modalAction.ModalChagerTestCalalog(false));
							document.body.style.overflow = "";
						}}>
						<div className="modal__wrapper">
							<Label
								title="Необходимо войти в учетную запись"
								classPrefix="modal__title"
							/>
							<Button
								disabled={false}
								handleAction={() => {
									href(ERoutes.login);
									document.body.style.overflow = "";
								}}
								name="Вход"
								classPrefix="modal_singin__button"
							/>
							<Button
								disabled={false}
								handleAction={() => {
									href(ERoutes.reget);
									dispatch(modalAction.ModalChagerTestCalalog(false));
									document.body.style.overflow = "";
								}}
								name="Регистрация"
								classPrefix="modal_singup__button"
							/>
						</div>
					</Modal>
				)}
			</section>
			<Footer />
		</>
	);
};
