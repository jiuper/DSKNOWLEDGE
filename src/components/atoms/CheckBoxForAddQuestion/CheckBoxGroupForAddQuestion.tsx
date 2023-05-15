import { useEffect, useState } from "react";
import { ITransfer } from "../../../types/type";
import { CheckBoxForAddQuestion } from "./CheckBoxForAddQuestion";
import { checkCorrectAnswer } from "../../../constants/errors";

interface ICheckBoxGroupForAddQuestion {
	items: string[];
	itemsTrue: (string | null)[];
	classPrefix: string;
	isCheckBoxValidate: boolean;
	onChange: (value: ITransfer, index: number) => void;
	onInput: (value: ITransfer, index: number) => void;
}

export const CheckBoxGroupForAddQuestion = ({
	items,
	classPrefix,
	onChange,
	onInput,
	itemsTrue,
	isCheckBoxValidate,
}: ICheckBoxGroupForAddQuestion) => {
	const inputGroup = items.map((el) => ({
		title: el,
		value: itemsTrue.includes(el),
	}));

	const [isValidate, setIsValidate] = useState<boolean>(false);

	useEffect(() => {
		if (itemsTrue.every((answer) => answer === null) && items.length > 1) {
			setIsValidate(true);
		} else setIsValidate(false);
	}, [isCheckBoxValidate, onInput]);

	return (
		<>
			<ul className={classPrefix}>
				{inputGroup.map((item, i) => (
					<CheckBoxForAddQuestion
						key={i}
						index={i}
						value={item.value}
						title={item.title}
						placeholder={`Вариант ${i + 1}`}
						onChange={onChange}
						onInput={onInput}
					/>
				))}
			</ul>

			{isValidate && (
				<span className="validateError">{checkCorrectAnswer}</span>
			)}
		</>
	);
};
