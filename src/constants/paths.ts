export enum ERoutes {
	main = "/",
	reget = "/signUp",
	login = "/signIn",
	profile = "/profile",
	tests = "/testPage",
	faq = "/faq",
	testCategory = "/testCategory",
	testDescription = "/testDescription",
	testQustions = "/testQustions",
	resultTestPage = "/ResultTestPage",
	listCategorys = "listCategorys",
	adminPanel = "/adminPanel",
	createSection = "createSection",
	editSection = "editSection",
	createTest = "createTest",
	editTest = "editTest",
	testSearchPage = "/testSearchPage",
}

export enum EBreadCrumbs {
	main = "/",
	reget = "signUp",
	login = "signIn",
	profile = "profile",
	tests = "testPage",
	faq = "faq",
	testCategory = "testCategory",
	testDescription = "testDescription",
	HOME = "Главная страница",
	TESTS = "Каталог тестов",
	TEST_CATEGORY = "Каталог тестов",
	TEST_DESCRIPTION = "Описание",
	testSearchPage = "testSearchPage",
}

export const breadCrumbs: any = {
	[EBreadCrumbs.main]: [{ href: EBreadCrumbs.main, title: "Главная страница" }],
	[EBreadCrumbs.reget]: [
		{ href: EBreadCrumbs.main, title: "Главная страница" },
		{ href: "#", title: "Регистрация" },
	],
	[EBreadCrumbs.login]: [
		{ href: EBreadCrumbs.main, title: "Главная страница" },
		{ href: "#", title: "Вход в систему" },
	],
	[EBreadCrumbs.profile]: [
		{ href: EBreadCrumbs.main, title: "Главная страница" },
		{ href: "#", title: "Профиль" },
	],
	[EBreadCrumbs.tests]: [
		{ href: EBreadCrumbs.main, title: "Главная страница" },
		{ href: "#", title: "Тесты" },
	],
	[EBreadCrumbs.faq]: [
		{ href: EBreadCrumbs.main, title: "Главная страница" },
		{ href: "#", title: "FAQ" },
	],
	[EBreadCrumbs.testSearchPage]: [
		{ href: EBreadCrumbs.main, title: "Главная страница" },
		{ href: "#", title: "Поиск" },
	],
}

export enum EQuerys {
	pageSignIn = "Account/Login",
	pageSignUp = "Account/Register",
	faq = "Faq/GetAll",
	catalogTest = "Category/GetAll",
	TestCategoryCards = "Test/GetAllByCategory",
	QuestionTest = "Question/GetAllByTest",
	feedbackCreateForm = "Feedback/Create",
	userUpdatePage = "User/GetById",
	userEditPage = "User/Edit",
	CategoryId = "Category/GetCategoryById",
	AllQuestionsByTestId = "Question/GetAllByTest",
	TestById = "Test/GetTestById",
	CreateCategory = "Category/Create",
	EditCategory = "Category/Edit",
	IdDeleteCategory = "Category/Delete",
	CreateNewTest = "Test/CreateTestWithQuestion",
	EditTest = "Test/EditTestWithQuestion",
	IdDeleteTest = "Test/Delete",
	SearchTest = "Test/SearchTests",
	CreateResult = "PassedTest/Create",
	GetAllResults = "PassedTest/GetAllByUser",
	getResultById = "PassedTest/GetById",
	GetStatistic = "PassedTest/GetStatistics",
	TestGeneralB = "Test/GetCommonTest",
	GetFinalExam = "/Test/GetFinalTest",
	ExportExelTemplate = "/Download/DownloadTemplate",
	UploadFile= "Test/ImportTest"
}
