import { Label } from "../../atoms/Label/Label";
import { modalAction } from "../../../store/reducers/modalReduser/modalReducer";
import { useHookDispatch } from "../../../store/reducers/redux";
import "./style.css";
import { Button } from "../../atoms/Button/Button";
import { Switch } from "../../atoms/Switch/Switch";
import { useEffect, useState } from "react";
import { IFetchExamTest, IModalTestGeneralToTest } from "../../../types/type";
import { useNavigate, useParams } from "react-router";
import { fetchExamTest } from "../../../api/FetchExamTest/fetchExamTest";
import { ERoutes } from "../../../constants/paths";
import { testComponentAction } from "../../../store/reducers/TestComponentReducer/testComponentReduser";
import { TestDescAction } from "../../../store/reducers/TestsForDescription/TestsForDescription";

export const ModalTestGeneralToTest = ({
	totalNumberOfTest,
}: IModalTestGeneralToTest) => {
	const dispatch = useHookDispatch();

	const href = useNavigate();
	const { catalogName } = useParams();
	const [isValidate, setIsValidate] = useState<boolean>(false)
	const addTest = (title: string, value: number | boolean) => {
		setStartTest({ ...startTest, [title]: value });
	};
	const [actualNumberOfQuestion, setActualNumberOfQuestion] =
		useState<number>(0);

	const [startTest, setStartTest] = useState<IFetchExamTest>({
		categoryId: catalogName ?? "",
		isTestOnTime: false,
		timeForTest: 0,
		cntQuestions: 0,
	});

	const numberOfTestInputHandler = (value: number) => {
		if (value > totalNumberOfTest) {
			setActualNumberOfQuestion(totalNumberOfTest);
		} else setActualNumberOfQuestion(value);
		if(value > 0){
			setIsValidate(false)
		}
	};

	useEffect(() => {
		addTest("cntQuestions", actualNumberOfQuestion);
	}, [actualNumberOfQuestion]);

	const passFinalTestHandler = () => {
		if(actualNumberOfQuestion === 0){
			setIsValidate(true)
		}else if (catalogName) {
			dispatch(
				fetchExamTest({
					...startTest,
					timeForTest:
						startTest.isTestOnTime === false ? 0 : startTest.timeForTest,
				})
			);
			dispatch(TestDescAction.setEmptyTestLists());
			href(ERoutes.testQustions);
			dispatch(modalAction.ModalTestGeneralToTest(false));
			document.body.style.overflow = "";
			dispatch(testComponentAction.isTestCommon(false));
		}
		
	};
	return (
		<div className="modal__testStart">
			<div className="modal__loader-title">
				<Label title="Тестирование по всему разделу" />
			</div>
			<div className=" addTestComponent__timeAndLevel">
				<div className="addTestComponent__timeAndLevel__time">
					<div className="addTestComponent__timeAndLevel__time-switch">
						<Switch
							isTestOnTime={startTest.isTestOnTime}
							handleAction={() => {
								addTest("isTestOnTime", !startTest.isTestOnTime);
							}}
						/>
						<Label
							title="Тест на время"
							classPrefix="addTestComponent__timeAndLevel__time-switch-text"
						/>
					</div>
					{startTest.isTestOnTime && (
						<div className="addTestComponent__timeAndLevel__time-input">
							<Label
								title="Время, мин"
								classPrefix="addTestComponent__timeAndLevel__time-text"
							/>
							<input
								placeholder="80:00"
								className="addTestComponent__timeAndLevel__time-textField"
								value={startTest.timeForTest === 0 ? "" : startTest.timeForTest}
								onChange={(e) => addTest("timeForTest", +e.target.value)}
							/>
						</div>
					)}
				</div>
				<div className="addTestComponent__timeAndLevel__amount">
					<span className="addTestComponent__timeAndLevel__time-switch-text">
						Количество вопросов (из{" "}
						<span className="addTestComponent__timeAndLevel__time-switch-Totaltext">
							{totalNumberOfTest}
						</span>
						)
					</span>
					<input
						placeholder="0"
						className={`addTestComponent__timeAndLevel__time-textField amountInput ${isValidate && "modal__error"}`}
						value={actualNumberOfQuestion}
						onChange={(e) => numberOfTestInputHandler(+e.target.value)}
						
					/>
					{isValidate && <span className="modal__error"> Неккоректное значение </span>}
				</div>
				
			</div>
			
			<div className="modal__loader-button">
				<Button
					name="Отмена"
					handleAction={() => {
						dispatch(modalAction.ModalTestGeneralToTest(false));
						document.body.style.overflow = "";
					}}
					classPrefix="deleteSectionModal__buttonGroup-CancelButton"
				/>
				<Button
					name="Начать тестирование"
					classPrefix="deleteSectionModal__buttonGroup-StartButton"
					handleAction={passFinalTestHandler}
				/>
			</div>
		</div>
	);
};
