import { UniversalFormState } from "../../../types/type";

import { useEffect, useState } from "react";

export const regExp =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const regNumber = /^((\+375)+([0-9]){9})$/;

type B<T> = {
	[key in keyof T]: T[key];
};

export const useFormLogin = <T extends B<T>>(names: T) => {
	const generator = <T extends B<T>>(names: T): UniversalFormState<T> => {
		return (Object.keys(names) as Array<keyof T>).reduce<UniversalFormState<T>>(
			(acc, curr) => {
				acc[curr] = {
					value: names[curr],
					error: null,
					isDirty: false,
				};
				return acc;
			},
			{} as UniversalFormState<T>
		);
	};

	const [state, setState] = useState<UniversalFormState<B<typeof names>>>(
		generator(names)
	);

	const [isChanged, setIsChanged] = useState<boolean>(false);

	const [isValid, setIsValid] = useState<boolean>(false);

	const handleChange = (value: string, type: keyof B<typeof names>) => {
		setIsChanged(true);
		setState({ ...state, [type]: { ...state[type], value: value } });
	};

	const handleOnBlur = (value: boolean, type: keyof B<typeof names>) => {
		setIsChanged(true);
		setState({ ...state, [type]: { ...state[type], isDirty: value } });
	};

	const isValidation = (
		value: string,
		type: keyof B<typeof names>
	): string | null => {
		switch (true) {
			case type === "email" &&
				!regExp.test(value.trim()) &&
				value.trim().length > 0:
				return "Некорректный Email";
			case 
				type !== "email" &&
				type !== "phoneNumber" &&
				type !== "patronymic" &&
				type !== "login" &&
				type !== "password" &&
				value.trim().length === 0:
				return "Поле не заполнено";
			case type === "phoneNumber" &&
				!regNumber.test(value.trim()) &&
				value.trim().length > 0:
				return "Некорректный номер телефона";
			default:
				return null;
		}
	};

	const isErrorValidator = (state: UniversalFormState<B<typeof names>>) => {
		const result = { ...state };
		let key: keyof B<typeof names>;
		for (key in state) {
			result[key].error = isValidation(state[key].value, key);
		}
		setState(result);
	};

	useEffect(() => {
		if (isChanged) {
			isErrorValidator(state);
			setIsChanged(false);
			setIsValid(
				Object.values(state)
					.map((el: any) => el.error)
					.every((el) => el === null)
			);
		}
	}, [state]);
	//console.log(names);

	return { state, handleChange, handleOnBlur, isValid };
};
