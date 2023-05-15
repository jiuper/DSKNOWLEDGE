import { useHookDispatch, useHookSelector } from "../../store/reducers/redux";
import { useEffect, useMemo, useState } from "react";
import { IObjState } from "../../types/type";
import { TestDescAction } from "../../store/reducers/TestsForDescription/TestsForDescription";
import { fetchCreateResult } from "../../api/fetchCreateResult/fetchCreateResult";
import { ERoutes } from "../../constants/paths";
import { resultTestAction } from "../../store/reducers/ResultTestReduser/ResultTestReduser";
import { modalAction } from "../../store/reducers/modalReduser/modalReducer";
import { useNavigate } from "react-router-dom";


export const usePassedTest = () => {
	const dispatch = useHookDispatch();
	const href = useNavigate();

	const { loginListsData, testLists, arrStyle, chosenTest, isTestCommon } =
		useHookSelector((state) => ({
			loginListsData: state.isAuthReducer.loginListsData,
			isPaginationTest: state.modalReducer.isPaginationTest,
			testLists: state.TestDescReducer.testLists,
			arrStyle: state.TestDescReducer.arrStyle,
			chosenTest: state.testComponentReducer.chosenTest,
			isTestCommon: state.testComponentReducer.isCommonTest,
		}));

	const [isCompleted, setIsCompleted] = useState<boolean>(false);
	const [isChanged, setIsChanged] = useState<boolean>(true);
	const [skipQustions, setSkipQustions] = useState<number[]>([]);
	const [obj, setObj] = useState<IObjState>({
		error: 0,
		right: 0,
		part: 0,
		score: 0,
		finishTest: false,
		nextQuest: 0,
		totalBal: [],
		testNameId: "",
		allTotalResult: {
			timeSpent: "",
			status: "пересдача",
			score: 0,
			total: 0,
			testId: "",
			userId: "",
			answeredQuestions: [],
		},
	});

	const filterNameTest = useMemo(
		() => testLists.find((test, i) => i === obj.nextQuest),
		[testLists, obj]
	);
	useEffect(() => {
		dispatch(TestDescAction.setTotalBar(obj.totalBal));
	}, [dispatch, obj]);
	useEffect(() => {
		if (isChanged) {
			updateDateResult(obj);
			setIsChanged(false);
		}
	}, [obj, isChanged]);
	useEffect(() => {
		if (testLists) updateDateResult(obj);
	}, [testLists]);
	useEffect(() => {
		if (isCompleted) {
			setObj({ ...obj, totalBal: [] });

			dispatch(TestDescAction.setEmptyTestLists());
			dispatch(modalAction.ModalIsPaginationTest(false));

			if (!isTestCommon) {
				href(ERoutes.resultTestPage);
				fetchCreateResult({
					...obj.allTotalResult,
					status:
						chosenTest?.minThreshold &&
						(obj.allTotalResult.score * 10) / obj.allTotalResult.total >
							chosenTest?.minThreshold
							? "зачтено"
							: "не зачтено",
				});
				dispatch(
					resultTestAction.getResultTest({
						...obj.allTotalResult,
						score: (obj.allTotalResult.score * 10) / obj.allTotalResult.total,
					})
				);
			}

			dispatch(modalAction.ModalDonut(true));
			document.body.style.overflow = "hidden";
		}
	}, [isCompleted]);

	const updateDateResult = (obj: IObjState) => {
		if (filterNameTest && loginListsData)
			setObj({
				...obj,
				allTotalResult: {
					...obj.allTotalResult,
					testId: obj.testNameId,
					userId: loginListsData.id,
					answeredQuestions: !obj.allTotalResult.answeredQuestions
						.map((el) => el.questionId)
						.includes(filterNameTest.id)
						? obj.allTotalResult.answeredQuestions.concat({
								questionId: filterNameTest.id,
								score: filterNameTest.numberOfPoints,
								listSelectedAnswers: obj.totalBal,
						  })
						: obj.allTotalResult.answeredQuestions.map((el) =>
								el.questionId === filterNameTest.id
									? { ...el, listSelectedAnswers: obj.totalBal }
									: el
						  ),
				},
			});
	};
	const onState = () => {
		if (filterNameTest)
			switch (arrStyle) {
				case "error__point":
					setObj({
						...obj,
						error: obj["error"] + 1,
						allTotalResult: {
							...obj.allTotalResult,
							total:
								obj.allTotalResult["total"] + filterNameTest.numberOfPoints,
							score: obj.allTotalResult["score"],
						},
						nextQuest:
							obj.allTotalResult.answeredQuestions.length !== testLists.length
								? obj["nextQuest"] + 1
								: skipQustions[0],
						totalBal: [],
					});
					break;
				case "right__point":
					setObj({
						...obj,
						right: obj["right"] + 1,
						score: obj["score"] + filterNameTest.numberOfPoints,
						allTotalResult: {
							...obj.allTotalResult,
							total:
								obj.allTotalResult["total"] + filterNameTest.numberOfPoints,
							score:
								obj.allTotalResult["score"] + filterNameTest.numberOfPoints,
						},
						nextQuest:
							obj.allTotalResult.answeredQuestions.length !== testLists.length
								? obj["nextQuest"] + 1
								: skipQustions[0],
						totalBal: [],
					});
					break;
				case "part__point":
					setObj({
						...obj,
						error: obj["part"] + 1,
						allTotalResult: {
							...obj.allTotalResult,
							total:
								obj.allTotalResult["total"] + filterNameTest.numberOfPoints,
							score:
								obj.allTotalResult["score"] + filterNameTest.numberOfPoints / 2,
						},
						nextQuest:
							obj.allTotalResult.answeredQuestions.length !== testLists.length
								? obj["nextQuest"] + 1
								: skipQustions[0],
						totalBal: [],
					});
			}

		setIsChanged(true);
		if (obj.nextQuest === testLists.length - 1) {
			setIsCompleted(true);
		}
	};
	const handleParams = (valuePar: string) => {
		setObj({
			...obj,
			testNameId: valuePar,
		});
		setIsChanged(true);
	};

	const onChange = (val: string) => {
		if (!obj.totalBal.includes(val)) {
			setObj({ ...obj, totalBal: [...obj.totalBal, val] });
		} else {
			setObj({ ...obj, totalBal: obj.totalBal.filter((el) => el !== val) });
		}
		if (skipQustions.length) {
			setSkipQustions(skipQustions.filter((el) => el !== obj.nextQuest));
		}
		setIsChanged(true);
	};
	const onInput = (value: string) => {
		setObj({ ...obj, totalBal: [value] });
		if (skipQustions.length) {
			setSkipQustions(skipQustions.filter((el) => el !== obj.nextQuest));
		}
		setIsChanged(true);
	};
	const setTimer = (val: number) => {
		setIsChanged(true);
		chosenTest && chosenTest.isTestOnTime && val === chosenTest.timeForTest * 60
			? setObj({ ...obj, finishTest: true })
			: setObj({ ...obj, finishTest: false });
		setObj({
			...obj,
			allTotalResult: {
				...obj.allTotalResult,
				timeSpent: `${
					Math.floor(val / 60) < 10
						? "0" + Math.floor(val / 60)
						: Math.floor(val / 60)
				} : ${val % 60 < 10 ? "0" + (val % 60) : val % 60}`,
			},
		});
	};

	const nextQuestion = () => {
		if (obj.totalBal.length) onState();
	};
	const finishTest = () => {
		setIsCompleted(true);
	};
	const skipQuestion = () => {
		if (!obj.totalBal.length) {
			setObj({ ...obj, nextQuest: obj["nextQuest"] + 1, totalBal: [], allTotalResult:{
				...obj.allTotalResult, 
				total: obj.allTotalResult["total"] + (filterNameTest?.numberOfPoints ?? 0),
			} });
			setSkipQustions([
				...skipQustions,
				testLists.findIndex(
					(el) => el === testLists.find((it, i) => i === obj.nextQuest)
				),
			]);
		}
		setIsChanged(true);
	};
	const skipFilterQuest = () => {
		const filterSkipQuest = skipQustions
			.filter((el) => el !== obj.nextQuest)
			.concat(
				testLists.findIndex(
					(el) => el === testLists.find((it, i) => i === obj.nextQuest)
				)
			);
		if (
			!obj.totalBal.length &&
			skipQustions.length &&
			obj.allTotalResult.answeredQuestions.length === testLists.length
		) {
			setSkipQustions(filterSkipQuest);
			setObj({
				...obj,
				nextQuest: filterSkipQuest[0],
			});
		}
	};

	return {
		obj,
		filterNameTest,
		nextQuestion,
		skipQuestion,
		skipFilterQuest,
		handleParams,
		onChange,
		onInput,
		setTimer,
		finishTest,
		skipQustions,
	};
};
