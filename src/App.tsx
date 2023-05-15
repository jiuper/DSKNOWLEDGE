import { Feedback } from "./page/Feedback/Feedback";
import { Route, Routes } from "react-router-dom";
import { TestPage } from "./page/TestPage/TestPage";
import { SignUp } from "./page/SignUp/SignUp";
import { Signin } from "./page/SignIn/SignIn";
import { Main } from "./page/Main/Main";
import { Profile } from "./page/Profile/Profile";
import { ERoutes } from "./constants/paths";
import { TestCategory } from "./page/TestCategory/TestCategory";
import { TestDescription } from "./page/TestDescription/TestDescription";
import { Suspense, useEffect } from "react";
import { useHookDispatch, useHookSelector } from "./store/reducers/redux";
import { TestQustion } from "./page/TestQustions/TestQustion";
import { ResultAnswersPage } from "./page/ResultAnswersPage/ResultAnswersPage";
import ActionTestSection from "./components/organisms/ActionTestSection/ActionTestSection";
import { EditCategory } from "./page/EditCategory/EditCategory";
import { CreateTestSection } from "./components/organisms/CreateTestSection/CreateTestSection";
import { AddQuestion } from "./page/AddQuestion/AddQuestion";
import { fetchUserDate } from "./api/FetchUserData/fetchUserDate";
import { TestComponent } from "./components/organisms/TestComponent/TestComponent";
import { TestSearchPage } from "./page/TestSearchPage/TestSearchPage";
import "./components/styles/styles.css";
import { useNavigate } from "react-router";
import useAuth from "./hooks/useAuth";
import React from "react";
import { Preloader } from "./components/atoms/Preloader/Preloader";

export const App = () => {
	const { loginListsData, actionPos, chosenTest } = useHookSelector(
		(state) => ({
			loginListsData: state.isAuthReducer.loginListsData,
			actionPos: state.editCategoryReducer.actionPos,
			chosenTest: state.testComponentReducer.chosenTest,
		})
	);
	const href = useNavigate();
	const userIsAuth = useAuth();
	//const AdminPage = React.lazy(()=>import('./components/organisms/ActionTestSection/ActionTestSection'))
	// useEffect(() => {
	// 	if (loginListsData?.roleName === "Admin" && chosenTest === null)
	// 		href(ERoutes.adminPanel)
	// }, [chosenTest, loginListsData])

	const adminPart = loginListsData ? <Main /> : <Preloader />;
	return (
		<div className="wrapper">
			<Routes>
				<Route
					path={ERoutes.main}
					element={
						loginListsData && loginListsData.roleName === "Admin" ? (
							<ActionTestSection />
						) : (
							<Main />
						)
					}
				/>

				<Route path={ERoutes.login} element={<Signin />} />
				<Route path={ERoutes.reget} element={<SignUp />} />
				<Route path={ERoutes.tests} element={<TestPage />} />
				<Route path={ERoutes.testCategory} element={<TestCategory />}>
					<Route
						path={ERoutes.testCategory + "/:catalogName"}
						element={<TestCategory />}
					/>
				</Route>
				<Route path={ERoutes.testDescription} element={<TestDescription />}>
					<Route
						path={ERoutes.testDescription + "/:catalogNameId"}
						element={<TestDescription />}
					/>
				</Route>
				<Route path={ERoutes.faq} element={<Feedback />} />

				<Route
					path={ERoutes.profile}
					element={userIsAuth ? <Profile /> : <Main />}>
					<Route path={ERoutes.profile + "/:id"} element={<Profile />} />
				</Route>

				<Route path={ERoutes.testQustions} element={<TestQustion />}>
					<Route
						path={ERoutes.testQustions + "/:testNameId"}
						element={<TestQustion />}
					/>
				</Route>
				<Route path={ERoutes.resultTestPage} element={<ResultAnswersPage />}>
					<Route
						path={ERoutes.resultTestPage + "/:ResultId"}
						element={<ResultAnswersPage />}
					/>
				</Route>

				<Route
					path={ERoutes.adminPanel}
					element={
						
							loginListsData?.roleName === "Admin" ? (
								<ActionTestSection />
							) : (
								adminPart
							)
					
					}>
					<Route index element={<EditCategory />} />
					<Route path={ERoutes.createSection} element={<CreateTestSection />} />
					<Route
						path={ERoutes.createSection + "/:id"}
						element={<CreateTestSection />}
					/>
					<Route
						path={ERoutes.createTest}
						element={actionPos !== "" ? <AddQuestion /> : <EditCategory />}
					/>
					<Route path={ERoutes.editTest} element={<TestComponent />} />
					<Route
						path={ERoutes.editTest + "/:testId"}
						element={<AddQuestion />}
					/>
				</Route>

				<Route path={ERoutes.testSearchPage} element={<TestSearchPage />} />
			</Routes>
		</div>
	);
};
