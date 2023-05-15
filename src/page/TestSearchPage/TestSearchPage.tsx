import { useLocation, useNavigate } from "react-router-dom";
import { BreadCrumbs } from "../../components/atoms/BreadCrumbs/BreadCrumbs";
import { Carousel } from "../../components/molecules/Carousel/Carousel";
import { Tabs } from "../../components/molecules/Tabs/Tabs";
import { Footer } from "../../components/template/Footer/Footer";
import { Header } from "../../components/template/Header/Header";
import { breadCrumbs, ERoutes } from "../../constants/paths";
import { tabsAction } from "../../store/reducers/tabsReducer/tabsReducer";
import { useHookDispatch, useHookSelector } from "../../store/reducers/redux";
import { CatalogTestLists } from "../../components/organisms/CatalogTestLists/CatalogTestLists";
import { useEffect, useMemo, useState } from "react";
import { fetchCatalogTest } from "../../api/FetchCatalogTest/FetchCatalogTest";
import { Button } from "../../components/atoms/Button/Button";
import { modalAction } from "../../store/reducers/modalReduser/modalReducer";
import { Label } from "../../components/atoms/Label/Label";
import { Modal } from "../../components/molecules/Modal/Modal";

import "./style.css";


export const TestSearchPage = () => {

    const dispatch = useHookDispatch()
    const href = useNavigate()
    const isDispatch = tabsAction.serchTestsType
    const { pathname } = useLocation()
    const {
        searchTests,
        searchTestData
    } = useHookSelector(state => ({
        searchTests: state.tabsReducer.searchTests,
        searchTestData: state.searchTestsReducer.searchTestData,
    }))

    const { isTestCategoryModalActive } = useHookSelector(state => state.modalReducer)
    const [sortedArr, setSortedArr] = useState<(string | undefined)[]>([])

    useEffect(() => {
        dispatch(fetchCatalogTest())
        setSortedArr(searchTestData.map(test => (test.categoryName)))
    }, [searchTestData, dispatch])

    const tabParams = sortedArr.reduce<{ [field: string]: number }>((sum, tab) => {
        if (!tab) return sum

        if (sum[tab]) {
            sum[tab]++
        } else {
            sum[tab] = 1
        }

        return sum
    }, {})

    const tabData = Object.entries(tabParams).map((tab) => ({ label: tab[0], type: tab[0], score: tab[1] }))
    const tabs = [{ label: "Все", type: "Все", score: tabData.length }, ...tabData]

    const filterTabs = useMemo(() =>
        searchTests !== 'Все' ? searchTestData.filter(test => test.categoryName === searchTests) : searchTestData
        , [searchTestData, searchTests])

    return (
        <>
            <Header searchClass="search-fieled" active={true} search={true} />
            <section className="test-search container">
                <BreadCrumbs paths={breadCrumbs[pathname.split("/")[1]]} />
                <div className="test-seach__nav">
                    <Carousel
                        classPrefix={tabs.length === 1 ? "test-seach__prev test-seach__next" : ""}
                        width={1232} length={1}
                        initionalValue={0}
                    >
                        <Tabs
                            classPrefix="test-seach__tabs"
                            tabs={tabs}
                            isActiveType={searchTests}
                            isDispatch={isDispatch}
                        />
                    </Carousel>
                </div>
                <div className="test-search__list">
                    {
                        searchTestData.length ?
                            <CatalogTestLists catalogTestData={filterTabs} />
                            :
                            <span className="emptiness">Ничего не найдено</span>
                    }
                </div>
            </section>

            {isTestCategoryModalActive && <Modal isLogin={isTestCategoryModalActive} handleChanger={() => {
                dispatch(modalAction.ModalChagerTestCalalog(false))
                document.body.style.overflow = ""
            }}>
                <div className="modal__wrapper">
                    <Label
                        title="Необходимо войти в учетную запись"
                        classPrefix="modal__title"
                    />
                    <Button
                        disabled={false}
                        handleAction={() => {
                            href(ERoutes.login)
                            document.body.style.overflow = ""
                        }
                        }
                        name="Вход"
                        classPrefix="modal_singin__button"
                    />
                    <Button
                        disabled={false}
                        handleAction={() => {
                            href(ERoutes.reget)
                            dispatch(modalAction.ModalChagerTestCalalog(false))
                            document.body.style.overflow = ""
                        }}
                        name="Регистрация"
                        classPrefix="modal_singup__button"
                    />
                </div>
            </Modal>}

            <Footer />
        </>
    )
}