import { Label } from "../../components/atoms/Label/Label";
import {
	IResultsTest,
	ResultQuestion,
} from "../../components/molecules/ResultQuestion/ResultQuestion";
import { Tabs } from "../../components/molecules/Tabs/Tabs";
import { Footer } from "../../components/template/Footer/Footer";
import { Header } from "../../components/template/Header/Header";
import { resultTabs } from "../../constants/links";
import { tabsAction } from "../../store/reducers/tabsReducer/tabsReducer";
import { useHookDispatch, useHookSelector } from "../../store/reducers/redux";
import { useEffect, useMemo, useState } from "react";
import { fetchByTest } from "../../api/FetchByTest/fetchByTest";
import { Modal } from "../../components/molecules/Modal/Modal";
import { modalAction } from "../../store/reducers/modalReduser/modalReducer";
import { ResultModal } from "../../components/molecules/resultModal/ResultModal";
import { useParams } from "react-router";
import { fetchGetResultById } from "../../api/fetchGetResultById/fetchGetResultById";

import "./style.css";
import { SkeletonResultItem } from "../../components/organisms/SkeletonResultItem/SkeletonResultItem";

export const ResultAnswersPage = () => {
	const dispatch = useHookDispatch();
	const isDispatch = tabsAction.selectedTypeResultPage;
	const { selectedTypeResultPage } = useHookSelector(
		(state) => state.tabsReducer
	);
	const { results, testLists, isLoading, donutModal } = useHookSelector(
		(state) => ({
			results: state.resultTestReduser.results,
			testLists: state.TestDescReducer.testLists,
			donutModal: state.modalReducer.donutModal,
			isLoading: state.TestDescReducer.isLoading,
		})
	);
	const [ansTest, setAnsTest] = useState<IResultsTest[]>([]);
	const { ResultId } = useParams();
	useEffect(() => {
		if (ResultId) {
			dispatch(fetchGetResultById(ResultId));
		}
	}, [ResultId, dispatch]);

	useEffect(() => {
		dispatch(fetchByTest(results.testId));
	}, [dispatch, results]);

	useEffect(() => {
		setAnsTest([]);
		testLists.forEach((test, i) => {
			if (testLists.length > ansTest.length) {
				setAnsTest([
					...ansTest,
					(ansTest[i] = {
						...ansTest[i],
						questionID: i + 1,
						picture: test.iconUrl,
						questionTitle: test.name,
						questionWeight: test.numberOfPoints,
						score: results.answeredQuestions[
							results.answeredQuestions.findIndex(
								(item) => item.questionId === test.id
							)
						]
							? results.answeredQuestions[
									results.answeredQuestions.findIndex(
										(item) => item.questionId === test.id
									)
							  ].score
							: 0,
						answers: test.answers,
						trueAnswers: test.trueAnswers.filter((answer) => answer !== ""),
						listSelectedAnswers: results.answeredQuestions[
							results.answeredQuestions.findIndex(
								(item) => item.questionId === test.id
							)
						]
							? results.answeredQuestions[
									results.answeredQuestions.findIndex(
										(item) => item.questionId === test.id
									)
							  ].listSelectedAnswers.filter(answer => !!answer)
							: [],
					}),
				]);
			}
		});
	}, [testLists, results]);

	const notAnswertQuestion = useMemo(
		() => ansTest.filter((test) => test.listSelectedAnswers.length === 0),
		[ansTest]
	);
	const wrongAnswer = useMemo(
		() =>
			ansTest.filter(
				(test) =>
				test.answers.length !== 1 && test.listSelectedAnswers.length === test.answers.length ||
					(test.listSelectedAnswers.length !== 0 &&
						test.listSelectedAnswers.length ===
							test.listSelectedAnswers.filter(
								(elem) => !test.trueAnswers.includes(elem)
							).length)
			),
		[ansTest]
	);
	const wrightAnswer = useMemo(
		() =>
			ansTest.filter(
				(test) =>
					test.listSelectedAnswers.length !== 0 &&
					test.trueAnswers.length === test.listSelectedAnswers.length &&
					test.trueAnswers.length ===
						test.listSelectedAnswers.filter((elem) =>
							test.trueAnswers.includes(elem)
						).length
			),
		[ansTest]
	);
	const particularyRightAnswer = useMemo(
		() =>
			ansTest.filter(
				(test) =>
					!notAnswertQuestion.includes(test) &&
					!wrongAnswer.includes(test) &&
					!wrightAnswer.includes(test)
			),
		[ansTest]
	);
	const arrSkeleton = Array(4).fill("");
	const lengrh: number[] = [
		ansTest.length,
		wrongAnswer.length,
		wrightAnswer.length,
		particularyRightAnswer.length,
		notAnswertQuestion.length,
	];
	const filteredArray: IResultsTest[] = Object.assign([], ansTest);

	filteredArray.forEach((test, i) => {
		if (particularyRightAnswer.includes(test)) {
			test.score = testLists[i].numberOfPoints / 2;
		}
		if (notAnswertQuestion.includes(test) || wrongAnswer.includes(test)) {
			test.score = 0;
		}
	});

	useEffect(() => {
		setAnsTest(filteredArray);
	}, []);

	return (
		<>
			<Header />
			<div className="resultAnswersPage__container container">
				<Tabs
					length={lengrh}
					isDispatch={isDispatch}
					isActiveType={selectedTypeResultPage}
					tabs={resultTabs}
				/>
				<div className="resultAnswersPage__underScore">
					<Label
						classPrefix="resultAnswersPage__underScore__mission"
						title="Задание"
					/>{" "}
					<Label
						classPrefix="resultAnswersPage__underScore__explanation"
						title="Объяснение"
					/>
				</div>
				{!isLoading &&
					arrSkeleton.map((el, i) => <SkeletonResultItem key={i} />)}
				{selectedTypeResultPage === "showAll" &&
					ansTest.map((test, i) => (
						<ResultQuestion
							key={i}
							questionID={test.questionID}
							questionWeight={test.questionWeight ?? 0}
							picture={`${test.picture}`}
							questionTitle={test.questionTitle}
							answers={test.answers}
							score={test.score ?? 0}
							listSelectedAnswers={test.listSelectedAnswers}
							trueAnswers={test.trueAnswers}
						/>
					))}
				{selectedTypeResultPage === "showUnchosen" &&
					notAnswertQuestion.map((el, i) => (
						<ResultQuestion
							key={i}
							questionID={el.questionID}
							questionWeight={el.questionWeight ?? 0}
							picture={`${el.picture}`}
							questionTitle={el.questionTitle}
							answers={el.answers}
							score={0}
							listSelectedAnswers={el.listSelectedAnswers}
							trueAnswers={el.trueAnswers}
						/>
					))}
				{selectedTypeResultPage === "showIncorrect" &&
					wrongAnswer.map((el, i) => (
						<ResultQuestion
							key={i}
							questionID={el.questionID}
							questionWeight={el.questionWeight ?? 0}
							picture={`${el.picture}`}
							questionTitle={el.questionTitle}
							answers={el.answers}
							score={0}
							listSelectedAnswers={el.listSelectedAnswers}
							trueAnswers={el.trueAnswers}
						/>
					))}
				{selectedTypeResultPage === "showCorrect" &&
					wrightAnswer.map((el, i) => (
						<ResultQuestion
							key={i}
							questionID={el.questionID}
							questionWeight={el.questionWeight ?? 0}
							picture={`${el.picture}`}
							questionTitle={el.questionTitle}
							answers={el.answers}
							score={el.questionWeight ?? 0}
							listSelectedAnswers={el.listSelectedAnswers}
							trueAnswers={el.trueAnswers}
						/>
					))}
				{selectedTypeResultPage === "showParticalyCorrect" &&
					particularyRightAnswer.map((el, i) => (
						<ResultQuestion
							key={i}
							questionID={el.questionID}
							questionWeight={el.questionWeight ?? 0}
							score={el.questionWeight ? el.questionWeight / 2 : 0}
							picture={`${el.picture}`}
							questionTitle={el.questionTitle}
							answers={el.answers}
							listSelectedAnswers={el.listSelectedAnswers}
							trueAnswers={el.trueAnswers}
						/>
					))}
			</div>
			<Footer />
			{donutModal && (
				<Modal
					handleChanger={() => {
						dispatch(modalAction.ModalDonut(false));
						document.body.style.overflow = "";
					}}
					isLogin={donutModal}>
					<ResultModal
						right={wrightAnswer.length}
						wrong={wrongAnswer.length}
						part={particularyRightAnswer.length}
						nonAnswer={notAnswertQuestion.length}
						score={+results.score.toFixed(1) ?? 0}
					/>
				</Modal>
			)}
		</>
	);
};
