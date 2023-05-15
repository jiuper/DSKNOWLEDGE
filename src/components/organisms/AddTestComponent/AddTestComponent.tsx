import { useEffect, useState } from "react"
import { IFullTest } from "../../../types/type"
import { Label } from "../../atoms/Label/Label"
import { RadioGroup } from "../../atoms/RadioGroup/RadioGroup"
import { Switch } from "../../atoms/Switch/Switch"
import { TestSectionAction } from "../../molecules/TestSectionAction/TestSectionAction"
import "./style.css";

interface ITestsData {
	sectionState:IFullTest
	imageUrl: string
	timeForTest: number
	minThreshold: number
	testLevel: string
	isTestOnTime: boolean
	userId: string | undefined
	isDelete: (value: string) => void
	addTest: (title: string, value: string | boolean | number) => void
	validateHandler: (prev: string, e: string) => void
	isBlur?: (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
	error:string
}

export const AddTestComponent = ({
	isTestOnTime,
	sectionState,
	imageUrl,
	userId,
	minThreshold,
	addTest,
	isDelete,
	timeForTest,
	testLevel,
	validateHandler,
	isBlur,
	error
}: ITestsData) => {
	const isRemove = () => {
		if (userId) {
			isDelete(userId)
		}
	}
	const [actualThreshold, setActualThreshold] = useState<number>(minThreshold)

	const thresholdInput = (value: number) => {
		if (value > 10) {
			setActualThreshold(10)
		} else {
			setActualThreshold(value)
		}
	}

	useEffect(() => {
		addTest("minThreshold", actualThreshold)
	}, [actualThreshold])

	return (
		<section className="addTestComponent__container">
			<div className="addTestComponent__timeAndLevel">
				<div className="addTestComponent__timeAndLevel__time">
					<div className="addTestComponent__timeAndLevel__time-switch">
						<Switch
							isTestOnTime={isTestOnTime}
							handleAction={() => {
								addTest("isTestOnTime", !isTestOnTime)
							}}
						/>
						<Label
							title="Тест на время"
							classPrefix="addTestComponent__timeAndLevel__time-switch-text"
						/>
					</div>
					{isTestOnTime && (
						<div className="addTestComponent__timeAndLevel__time-input">
							<Label
								title="Время, мин"
								classPrefix="addTestComponent__timeAndLevel__time-text"
							/>
							<input
								placeholder={"0"}
								className="addTestComponent__timeAndLevel__time-textField"
								value={timeForTest}
								onChange={(e) => addTest("timeForTest", +e.target.value)}
							/>
						</div>
					)}
				</div>
				<div className="addTestComponent__timeAndLevel__level">
					<Label
						title="Уровень"
						classPrefix="addTestComponent__timeAndLevel__level-text"
					/>
					<RadioGroup
						classPrefix="addTestComponent__timeAndLevel__level-radioGroup"
						textClass="addTestComponent__timeAndLevel__level-radioGroupText"
						addTest={addTest}
						testLevel={testLevel}
					/>
				</div>
				<div className="addTestComponent__timeAndLevel-threshold">
					<Label
						title="Порог успешного прохождения "
						classPrefix="addTestComponent__timeAndLevel__level-text"
					/>
					<input
						type="number"
						max={"10"}
						maxLength={2}
						min={"0"}
						className="threshold"
						value={actualThreshold === 0 ? "" : actualThreshold}
						placeholder="от 0.0"
						onChange={(e) => {
							thresholdInput(+e.target.value)
						}}
					/>
				</div>
			</div>
			<TestSectionAction
				handleChange={addTest}
				validateHandler={validateHandler}
				sectionState={{ description: sectionState.description, imageUrl, name: sectionState.name }}
				isBlur={isBlur}
				error={error}
			/>
			<div
				className={userId ? "create-actions__delete" : "hidden"}
				onClick={isRemove}>
				Удалить тест
			</div>
		</section>
	)
}
