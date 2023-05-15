import { Header } from "../../components/template/Header/Header";
import { BreadCrumbs } from "../../components/atoms/BreadCrumbs/BreadCrumbs";
import { EBreadCrumbs, ERoutes } from "../../constants/paths";
import { TestDescriptionList } from "../../components/organisms/TestDescriptionLists/TestDescriptionLists";
import { Modal } from "../../components/molecules/Modal/Modal";
import { useHookDispatch, useHookSelector } from "../../store/reducers/redux";
import { modalAction } from "../../store/reducers/modalReduser/modalReducer";
import { TestCancel } from "../../components/molecules/TestCancel/TestCancel";
import { useNavigate, useParams } from "react-router-dom";
import { ILinks } from "../../types/type";
import { useEffect, useMemo } from "react";
import clock from "../../assets/images/clock.svg";
import { fetchCatalogTest } from "../../api/FetchCatalogTest/FetchCatalogTest";
import { fetchTestsList } from "../../api/FetchTestsList/FetchTestsList";

import "./style.css";
import { testComponentAction } from "../../store/reducers/TestComponentReducer/testComponentReduser";

export const TestDescription = () => {
	const {
		isInfoItemModalActive,
		actualId,
		testsCatalog,
		testLists,
		searchTestData,
	} = useHookSelector((state) => ({
		isInfoItemModalActive: state.modalReducer.isInfoItemModalActive,
		actualId: state.modalReducer.actualId,
		testsCatalog: state.catalogTestReducer.testsCatalog,
		testLists: state.catalogTestReducer.testLists,
		searchTestData: state.searchTestsReducer.searchTestData,
	}));

	const dispatch = useHookDispatch();
	const href = useNavigate();
	const { catalogNameId } = useParams();

	const filterName = useMemo(
		() =>
			testLists.find((el) =>
				testsCatalog.find((item) => item.categoryId.toLowerCase() === el.id)
			),
		[testLists, testsCatalog]
	);

	const filterName1 = useMemo(
		() => searchTestData.find((el) => el.id === catalogNameId)?.categoryId,
		[catalogNameId, searchTestData]
	);

	const paths: ILinks[] = [
		{ href: ERoutes.main, title: EBreadCrumbs.HOME, separator: "/" },
		{ href: ERoutes.tests, title: "Тесты", separator: "/" },
		{
			href: ERoutes.testCategory + `/${filterName?.id}`,
			title: filterName?.name,
			separator: "/",
		},
		{ href: "#", title: "Описание" },
	];

	const time = testsCatalog.find((test) => test.timeForTest)?.timeForTest;

	useEffect(() => {
		dispatch(fetchCatalogTest());
		if (testsCatalog.length === 0) {
			href(ERoutes.tests);
		}
		if (filterName1) {
			dispatch(fetchTestsList(filterName1));
		}
	}, [dispatch, filterName1]);

	return (
		<>
			<Header />
			<section className="description-page container">
				<BreadCrumbs paths={paths} />
				<div className="description-page__wrapper">
					{testsCatalog && <TestDescriptionList infoDB={testsCatalog} />}
				</div>
			</section>

			{isInfoItemModalActive && (
				<Modal
					handleChanger={() => {
						dispatch(modalAction.ModalCangerInfoItem(false));
						document.body.style.overflow = "";
					}}
					isLogin={isInfoItemModalActive}>
					<TestCancel
						src={clock}
						warning={time ? "Тест на время" : "Без время"}
						annotation={
							time
								? "На тест дано ограниченное количество времени, отсчет начнется после подтверждения,  отменить это действие будет невозможно!"
								: "Тест без ограничения по времени"
						}
						buttonText="Начать тест"
						handleAction={() => {
							dispatch(modalAction.ModalCangerInfoItem(false));
							document.body.style.overflow = "";
						}}
						handleAccept={() => {
							href(ERoutes.testQustions + `/${actualId}`);
							dispatch(modalAction.ModalCangerInfoItem(false));
							document.body.style.overflow = "";
							dispatch(testComponentAction.isTestCommon(false));
						}}
					/>
				</Modal>
			)}
		</>
	);
};
