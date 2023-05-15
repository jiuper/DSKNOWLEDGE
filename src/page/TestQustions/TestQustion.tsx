import { useHookDispatch, useHookSelector } from "../../store/reducers/redux";
import { modalAction } from "../../store/reducers/modalReduser/modalReducer";
import { Modal } from "../../components/molecules/Modal/Modal";
import { useParams } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import { TestQuestionsPage } from "./TestQuestionsPage";
import { ButtonActions } from "../../types/type";
import { TestQustionStatus } from "../../components/molecules/TestQustionStatus/TestQustionStatus";
import { fetchByTest } from "../../api/FetchByTest/fetchByTest";
import { TestQuestionGroup } from "../../components/organisms/TestQuestionGroup/TestQuestionGroup";
import { ModalPaginationTest } from "../../components/organisms/ModalPaginationTest/ModalPaginationTest";
import { ProgressLine } from "../../components/atoms/ProgressLine/ProgressLine";
import { fetchTestById } from "../../api/FetchTestById/FetchTestById";
import "./style.css";
import { usePassedTest } from "./PassingTest";
import { ResultModal } from "../../components/molecules/resultModal/ResultModal";

export const TestQustion = () => {
	const dispatch = useHookDispatch();
	const { testNameId } = useParams();

	const { isPaginationTest, testLists, chosenTest, donutModal, isTestCommon } =
		useHookSelector((state) => ({
			isPaginationTest: state.modalReducer.isPaginationTest,
			testLists: state.TestDescReducer.testLists,
			chosenTest: state.testComponentReducer.chosenTest,
			donutModal: state.modalReducer.donutModal,
			isTestCommon: state.testComponentReducer.isCommonTest
		}));
	const {
		filterNameTest,
		skipFilterQuest,
		skipQuestion,
		nextQuestion,
		obj,
		handleParams,
		onInput,
		onChange,
		setTimer,
		finishTest,
		skipQustions,
	} = usePassedTest();


	useEffect(() => {
		if (testNameId) {
			dispatch(fetchTestById(testNameId));
			dispatch(fetchByTest(testNameId));
			handleParams(testNameId);
		}
	}, [dispatch, testNameId]);

	useEffect(() => {
		if (!testNameId && testLists.length !== 0 && !isTestCommon) {
			dispatch(fetchTestById(testLists[0].testId));
			handleParams(testLists[0].testId);
		}
	}, [testLists.length, dispatch]);

	

	const onButtonAction = (type: string) => {
		const methods = {
			[ButtonActions.nextQuest]: () => {
				nextQuestion();
			},
			[ButtonActions.skippQuest]: () => {
				skipQuestion();
			},
			[ButtonActions.skipFilterQuest]: () => {
				skipFilterQuest();
			},
			[ButtonActions.finishTest]: () => {
				finishTest();
			},
		};

		return methods[type as ButtonActions]();
	};

	return (
		<>
			{chosenTest && chosenTest.isTestOnTime ? (
				<ProgressLine min={chosenTest.timeForTest} setTimer={setTimer} />
			) : (
				<></>
			)}
			<section className="testQustion">
				<div className="container">
					<TestQuestionGroup
						nextQuest={obj.nextQuest}
						length={testLists.length}
						filterResultQuest={obj.score}
					/>
					{filterNameTest && (
						<TestQuestionsPage
							onChange={onChange}
							onInput={onInput}
							onButtonAction={onButtonAction}
							skipQuest={
								skipQustions.length !== 0 &&
								obj.allTotalResult.answeredQuestions.length === testLists.length
							}
							filterTestQuestion={filterNameTest}
							nextQuest={obj.nextQuest}
							length={testLists.length}
							finishTest={obj.finishTest}
						/>
					)}
					<div className="testQustion__status">
						<TestQustionStatus
							nextQuest={obj.error + obj.part + obj.right}
							error={obj.error}
							right={obj.right}
							part={obj.part}
						/>
					</div>
				</div>
			</section>

			<Modal
				handleChanger={() => {
					dispatch(modalAction.ModalIsPaginationTest(false));
					document.body.style.overflow = "";
				}}
				isLogin={isPaginationTest}>
				<ModalPaginationTest
					nextQuest={obj.nextQuest}
					length={testLists.length}
					onButtonAction={onButtonAction}
				/>
			</Modal>
			{donutModal && (
				<Modal
					handleChanger={() => {
						dispatch(modalAction.ModalDonut(false));
						document.body.style.overflow = "";
					}}
					isLogin={donutModal}>
					<ResultModal
						right={obj.right}
						wrong={obj.error}
						part={obj.part}
						nonAnswer={skipQustions.length}
						score={obj.score}
					/>
				</Modal>
			)}
		</>
	);
};
