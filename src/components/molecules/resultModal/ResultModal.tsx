import React from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { ERoutes } from "../../../constants/paths";
import { modalAction } from "../../../store/reducers/modalReduser/modalReducer";
import {
	useHookDispatch,
	useHookSelector,
} from "../../../store/reducers/redux";
import { Button } from "../../atoms/Button/Button";
import { DemoPie } from "../../atoms/DonutChart/DemoPie";
import { Label } from "../../atoms/Label/Label";
import "./style.css";

export interface ResultModalType {
	right: number;
	wrong: number;
	part: number;
	nonAnswer: number;
	score: number;
}

export const ResultModal = ({
	right,
	wrong,
	part,
	nonAnswer,
	score,
}: ResultModalType) => {
	const { isCommonTest } = useHookSelector(
		(state) => state.testComponentReducer
	);
	const data = [
		{
			type: `Верные`,
			value: right ** 2,
		},
		{
			type: `Вариант не выбран`,
			value: nonAnswer ** 2,
		},
		{
			type: `Частично верные`,
			value: part ** 2,
		},
		{
			type: `Неверные`,
			value: wrong ** 2,
		},
	];
	const href = useNavigate();
	const dispatch = useHookDispatch();
	return (
		<section className="resultModal__container">
			<div className="resultModal__text">
				<Label
					title="Отличный результат!"
					classPrefix="resultModal__text-title"
				/>
				<Label title="Вы набрали" classPrefix="resultModal__text-mainText" />
			</div>
			<div className="asdadadad">
				<DemoPie data={data} score={score} />
			</div>
			<div className="resultModal__buttonGroup">
				<Button
					name="На главную"
					classPrefix="resultModal__buttonGroup-exitButton"
					handleAction={() => {
						href("/");
						dispatch(modalAction.ModalDonut(false));
						document.body.style.overflow = "";
					}}
				/>
				{!isCommonTest && (
					<Button
						name="Разбор теста"
						classPrefix="resultModal__buttonGroup-resultButton"
						handleAction={() => {
							dispatch(modalAction.ModalDonut(false));
							document.body.style.overflow = "";
						}}
					/>
				)}
			</div>
		</section>
	);
};
