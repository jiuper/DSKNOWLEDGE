import {
	ICheckBoxValue,
	ICheckBoxValueResult,
	IFooter,
	ILinks,
	IRegisterTextFields,
	ISelectOptionsProps,
	ITabs,
	ITitleTable,
} from "../types/type"
import { ERoutes } from "./paths"
import discord_icon from "../assets/images/discord-icon.svg"
import instagram_icon from "../assets/images/instagram-icon.svg"
import linkidin_icon from "../assets/images/linkedin-icon.svg"
import tiktok_icon from "../assets/images/tiktok-icon.svg"

export const link: ILinks[] = [
	{
		title: "Каталог тестов",
		href: ERoutes.tests,
	},
	{
		title: "Контакты",
		href: "",
	},
	{
		title: "FAQ",
		href: ERoutes.faq,
	},
]

export const social: IFooter[] = [
	{ href: "#", src: discord_icon },
	{ href: "#", src: instagram_icon },
	{ href: "#", src: linkidin_icon },
	{ href: "#", src: tiktok_icon },
]

export const tabs: ITabs[] = [
	{ label: "Вход в систему", type: "ForAuthorizations" },
	{ label: "Преподователям", type: "ForTeachers" },
	{ label: "Студентам", type: "ForStudents" },
]

export const numbers: ILinks[] = [
	{ href: "#", title: "+375 (29) 262-35-55" },
	{ href: "#", title: "+375 (33) 614-74-44" },
]

export const pathProfile: ITabs[] = [
	{ label: "Профиль", type: "isProfile" },
	{ label: "Результаты тестов", type: "isResultTest" },
]

export const addQuestionTabs: ITabs[] = [
	{ label: "Тест", type: "Test" },
	{ label: "Задания", type: "Question" },
]

export const titleTable: ITitleTable[] = [
	{ title: "Сроки", classPrefix: "item-80" },
	{ title: "Название", classPrefix: "item-190" },
	{ title: "Балл", classPrefix: "item-80" },
	{ title: "Статус", classPrefix: "item-80" },
	{ title: "Пройти", classPrefix: "item-80" },
]

export const titleStoryTest: ITitleTable[] = [
	{ title: "Дата", classPrefix: "item-80" },
	{ title: "Название", classPrefix: "item-190" },
	{ title: "Время", classPrefix: "item-80" },
	{ title: "Кол-во вопросов", classPrefix: "item-190" },
	{ title: "Средний балл", classPrefix: "item-190" },
	{ title: "Статус", classPrefix: "item-80" },
	{ title: "Просмотр", classPrefix: "item-80" },
]

export const resultTestsSection: ICheckBoxValue[] = [
	{ label: "Анатомия", value: "Анатомия", name: "name1" },
	{ label: "Генетика", value: "Генетика", name: "name2" },
	{ label: "Гистология", value: "Гистология", name: "name3" },
	{ label: "Фармакология", value: "Фармакология", name: "name4" },
	{ label: "Физика", value: "Физика", name: "name5" },
]

export const resultTestsStatus: ICheckBoxValue[] = [
	{ label: "Зачтено", value: "зачтено", name: "name6" },
	{ label: "Не зачтено", value: "не зачтено", name: "name7" },
	{ label: "Пересдача", value: "пересдача", name: "name8" },
]

export const resultTestsYers: ICheckBoxValue[] = [
	{ label: "2022", value: "2022", name: "name9" },
	{ label: "2021", value: "2021", name: "name10" },
	{ label: "2020", value: "2020", name: "name11" },
]

export const feedbackOptions: ISelectOptionsProps[] = [
	{
		value: "ForAuthorizations",
		text: "Проблемы со входом",
	},
	{
		value: "ForTeachers",
		text: "Найдена ошибка",
	},
	{
		value: "ForStudents",
		text: "Другое",
	},
]

export const dataOptions: ISelectOptionsProps[] = [
	{
		value: "new",
		text: "Новые",
	},
	{
		value: "old",
		text: "Старые",
	},
	{
		value: "begin",
		text: "А-Я",
	},
	{
		value: "end",
		text: "Я-А",
	},
]
export const dataOptionsLevel: ISelectOptionsProps[] = [
	{
		value: "",
		text: "Уровень",
	},
	{
		value: "Preparatory",
		text: "Подготовительный",
		level: 1,
	},
	{
		value: "Middle",
		text: "Базовый",
		level: 2,
	},
	{
		value: "High",
		text: "Высокий",
		level: 3,
	},
]

export const dataEditCategorySelector: ISelectOptionsProps[] = [
	{
		value: "",
		text: "Время",
	},
	{
		value: "true",
		text: "Да",
	},
	{
		value: "false",
		text: "Нет",
	},
]

export const dataAddQuestionForm: ISelectOptionsProps[] = [
	{
		value: "default",
		text: "Вид вопроса",
	},
	{
		value: "ManyOfMany",
		text: "Несколько из списка",
	},
	{
		value: "OneOfMany",
		text: "Один из списка",
	},
	{
		value: "InputText",
		text: "Текстовое поле",
	},
]

export const dataAddQuestionForms: ISelectOptionsProps[] = [
	{
		value: "OneOfMany",
		text: "Один из списка",
	},
	{
		value: "ManyOfMany",
		text: "Несколько из списка",
	},

	{
		value: "InputText",
		text: "Текстовое поле",
	},
]

export const items = [
	{
		href: ERoutes.profile,
		title: "Профиль",
	},
	{
		href: ERoutes.profile,
		title: "Результаты тестов",
	},
	{
		href: ERoutes.main,
		title: "Выход",
	},
]

export const item = [
	{
		href: ERoutes.main,
		title: "Выход",
	},
]

export const dataListsMonths: ISelectOptionsProps[] = [
	{
		value: "0",
		text: "Месяц",
	},
	{
		value: "1",
		text: "Январь",
	},
	{
		value: "2",
		text: "Февраль",
	},
	{
		value: "3",
		text: "Март",
	},
	{
		value: "4",
		text: "Апрель",
	},
	{
		value: "5",
		text: "Май",
	},
	{
		value: "6",
		text: "Июнь",
	},
	{
		value: "7",
		text: "Июль",
	},
	{
		value: "8",
		text: "Август",
	},
	{
		value: "9",
		text: "Сентябрь",
	},
	{
		value: "10",
		text: "Октябрь",
	},
	{
		value: "11",
		text: "Ноябрь",
	},
	{
		value: "12",
		text: "Декабрь",
	},
]

export const dataListsYears: ISelectOptionsProps[] = [
	{
		value: "2023",
		text: "2023",
	},
	{
		value: "2022",
		text: "2022",
	},
	{
		value: "2021",
		text: "2021",
	},
	{
		value: "2020",
		text: "2020",
	},
]

export const questionTestItems: ICheckBoxValueResult[] = [
	{
		label: "Ульнарисный разгибатель запястья",
		value: "Ульнарисный разгибатель запястья",
	},
	{ label: "Разгибатель пальцев", value: "Разгибатель пальцев" },
	{
		label: "Разгибатель запястья бревис",
		value: "Разгибатель запястья бревис",
	},
]

export const resultTabs: ITabs[] = [
	{
		label: "Все",
		type: "showAll",
	},
	{
		label: "Неверный ответ:",
		type: "showIncorrect",
	},
	{
		label: "Верный ответ:",
		type: "showCorrect",
	},
	{
		label: "Частично верный:",
		type: "showParticalyCorrect",
	},
	{
		label: "Вариант  не выбран:",
		type: "showUnchosen",
	},
]

export const textFieldsList: IRegisterTextFields[] = [
	{
		placeholder: "Имя",
		name: "Name",
		value: "name",
	},
	{
		placeholder: "Фамилия",
		name: "Surname",
		value: "surname",
	},
	{
		placeholder: "Отчество",
		name: "Patronymic",
		value: "patronymic",
	},
	{
		placeholder: "Организация",
		name: "Organisation",
		value: "organisation",
	},
	{
		placeholder: "Специализация",
		name: "Specialization",
		value: "specialization",
	},
	{
		placeholder: "Телефонный номер",
		name: "phoneNumber",
		value: "phoneNumber",
	},
]
