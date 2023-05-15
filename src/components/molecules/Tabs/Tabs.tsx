import { Button } from "../../atoms/Button/Button"
import { ITabs } from "../../../types/type"
import { useHookDispatch } from "../../../store/reducers/redux"
import { useCallback } from "react"
import { ActionCreatorWithPayload } from "@reduxjs/toolkit"

import "./style.css"

export interface ITab {
	tabs: ITabs[];
	isActiveType: string;
	isDispatch: ActionCreatorWithPayload<string>;
	length?: number[] ;
	classPrefix?: string;
}

export const Tabs = ({ tabs, isActiveType, isDispatch, length, classPrefix }: ITab) => {
	
	const dispatch = useHookDispatch()

	const onSelectTypeChange = useCallback((type: string) => {
		dispatch(isDispatch(type))
	}, [dispatch, isDispatch])

	return (
		<div className={`tabs ${classPrefix}`}>
			{
				length === undefined ? tabs.map((el, i) =>
					<Button
						disabled={false}
						key={el.label}
						handleAction={() => onSelectTypeChange(el.type)}
						name={`${el.label}${typeof el.score === 'number' ? `(${el.score})` : ""}`}
						classPrefix={`tabs__button ${isActiveType === el.type ? "tabs__button-active" : ""}`}
					/>
				) :
					tabs.map((el, i) =>
						<Button
							disabled={false}
							key={el.label}
							handleAction={() => onSelectTypeChange(el.type)}
							name={`${el.label} ${length[i]} `}
							classPrefix={`tabs__button ${isActiveType === el.type ? "tabs__button-active" : ""}`}
						/>
					)
			}
		</div>
	)
}
