export interface IButtonType {
	disabled?: boolean;
	name?: string;
	classPrefix?: string;
	type?: "submit" | "reset" | "button" | undefined;
	handleAction?: () => void;
}

export interface ILinks {
	href: string | undefined;
	title: string | undefined;
	separator?: string;
}

export interface ILoginForm {
	email: string;
	password: string;
}

export interface IRegisterForm {
	email: string;
	firstName: string;
	surName: string;
	lastName: string;
	organisation: string;
	specialization: string;
	phoneNumber: string;
}

export interface IRespProfileInfo {
	id: string;
	firstName: string;
	surName: string;
	lastName: string;
	organization: string;
	dataCreated?: string;
	email: string;
	login?: string;
	password?: string;
	specialization: string;
	phoneNumber: string;
	roleName?: string;
	isActivated?: boolean;
	isDeleted?: boolean;
	iconUrl: string;
	token: string;
}

export interface IFooter {
	href: string;
	src: string;
}

export interface IFaQuestion {
	id?: number;
	question: string;
	answer: string;
	category: string;
}

export interface ITabs {
	label: string;
	type: string;
	score?: number;
}

export interface ICatalogTestPage {
	id: string;
	name: string;
	cntTest: number;
	imageUrl: string;
	createdDate: string;
	description: string;
	tests: null;
	updatedDate: string;
}

export interface ITestsCatalogPage {
	id: string;
	category: string;
	description: string;
	timeForTest: number;
	cntQuestion: string;
	testLevel: any;
	imageUrl: string;
	score: string;
	questions: ITestQuestionsData[];
	name: string;
	isTestOnTime: string;
	updateDate: string;
	minThreshold: number;
	createdDate: string;
	categoryId: string;
	categoryName?: string;
	testType: string;
}

export interface ISelectOptionsProps {
	text: string;
	value: string;
	level?: number;
}

export interface IFeedbackForm {
	name: string;
	surname: string;
	email: string;
	theme: string;
	problem: string;
}

export interface ITitleTable {
	title: string;
	classPrefix?: string;
}

export interface ICarousel {
	children: React.ReactNode;
	classPrefix?: string;
	width: number;
	length: number;
	initionalValue: number;
}

export interface ICheckBoxValue {
	label: string;
	value: string;
	name: string;
}

export interface ICheckBoxValueResult {
	label: string;
	value: string;
}

export type UniversalFormState<T> = {
	[key in keyof T]: {
		value: T[key];
		error: string | null;
		isDirty: boolean;
	};
};

export enum formReget {
	email = "email",
	login = "login",
	password = "password",
	lastName = "lastName",
	firstName = "firstName",
	surName = "surName",
	patronymic = "patronymic",
	organisation = "organisation",
	specialization = "specialization",
	phoneNumber = "phoneNumber",
}

export interface IRegisterFormValues {
	[formReget.email]: string;
	[formReget.login]: string;
	[formReget.password]: string;
	[formReget.firstName]: string;
	[formReget.lastName]: string;
	[formReget.surName]: string;
	[formReget.patronymic]: string;
	[formReget.organisation]: string;
	[formReget.specialization]: string;
	[formReget.phoneNumber]: string;
}

export interface ILoginFormValues {
	email: string;
	password: string;
}

export enum filterFil {
	category = "category",
	status = "status",
	year = "year",
	yearTo = "yearTo",
	yearFrom = "yearFrom",
	scoreTo = "scoreTo",
	scoreFrom = "scoreFrom",
}

export interface IFilterParams {
	[filterFil.category]: string[];
	[filterFil.status]: string[];
	[filterFil.scoreTo]: string;
	[filterFil.yearFrom]: string;
	[filterFil.scoreFrom]: string;
	[filterFil.yearTo]: string;
	[filterFil.year]: string[];
}

export interface IModalCancel {
	warning: string;
	annotation: string;
	buttonText: string;
	src?: string;
	handleAction: () => void;
	handleAccept: () => void;
}

export interface ITestQuestionsData {
	id: string;
	iconUrl: string;
	name: string;
	answers: string[];
	numberOfPoints: number;
	questionType: any;
	test: null;
	testId: string;
	trueAnswers: string[];
	explanation: string;
}

export interface IModalProfileEdit {
	firstName: string;
	id: string;
	lastName: string;
	surName: string;
	specialization: string;
	organization: string;
	email: string;
	phoneNumber: string;
	token: string;
	iconUrl: string;
}

export interface QustionBoxItemType {
	sequenceNum: number;
	nextQuest: number;
	index: number;
	arrayIndex: number;
}

export interface ITransfer {
	value: boolean;
	title: string;
}

export interface IQuestionState {
	id?: string | null
	iconUrl: string
	name: string
	questionType: string
	numberOfPoints: number
	answers: string[]
	trueAnswers: (string | null)[]
	isValidate:boolean
}

export interface IFullTest {
	id?: string;
	name: string;
	description: string;
	imageUrl: string;
	testLevel: string;
	isTestOnTime: boolean;
	isRandomAnswers: boolean;
	minThreshold: number;
	isRandomQuestions: boolean;
	timeForTest: number;
	score: number;
	categoryId: string;
	questions: IQuestionState[];
}

export interface IRegisterTextFields {
	placeholder: string;
	name: string;
	value: string;
}

export interface IRadio {
	value: string;
	name: string;
	marker: string;
	label: string;
	textClass?: string;
	placeholder?: number;
}

export interface ITestQustion {
	id?: "";
	timeSpent: string;
	status: string;
	dateOfPassage: string;
	cntQuestion?: number;
	score: number;
	testName: string;
	categoryName: string;
	testId: string | undefined;
	userId: string;
	answeredQuestions: IAnsweredQuestions[];
}

export interface IAnsweredQuestions {
	score: number;
	questionId: string;
	listSelectedAnswers: string[];
	trueAnswers?: string[];
}

export interface IHeaderEditComponent {
	imageUrl: string;
	name: string;
	description: string;
	cntTest: number | null;
}

export interface IGetStatistic {
	userId: string;
	month: number;
	year: number;
}

export interface IProgressCardStatistic {
	countPassedTest: number;
	averageScore: number;
}

export interface IProgressBar {
	type: string;
	averageScore: number;
	countPassedTest: number;
}

export interface ResultTestQustionType {
	timeSpent: string;
	status: string;
	score: number;
	total: number;
	testId: string;
	userId: string;
	answeredQuestions: IAnsweredQuestions[];
}

export enum ButtonActions {
	nextQuest = "onNextQuest",
	skippQuest = "onSkippQuest",
	skipFilterQuest = "onSkipFilterQuest",
	finishTest = "onFinishTest",
}

export interface IObjState {
	error: number;
	right: number;
	part: number;
	score: number;
	finishTest: boolean;
	nextQuest: number;
	totalBal: string[];
	testNameId: string;
	allTotalResult: ResultTestQustionType;
}
export interface ITestGeneralVategoryTypes {
	name: string;
	description: string;
	onAction: () => void;
	totalNumberOfTest: number;
}

export interface IModalTestGeneralToTest {
	totalNumberOfTest: number;
}

export interface IFetchExamTest {
	categoryId: string;
	isTestOnTime: boolean;
	timeForTest: number;
	cntQuestions: number;
}
