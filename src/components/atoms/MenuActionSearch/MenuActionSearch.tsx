import { useEffect, useRef, useState } from "react";
import { Picture } from "../Picture/Picture";
import { TextField } from "../TextField/TextField";
import { useNavigate } from "react-router-dom";
import { ERoutes } from "../../../constants/paths";
import { useHookDispatch } from "../../../store/reducers/redux";
import { fetchSearchTest } from "../../../api/FetchSearchTest/FetchSearchTest";
import { searchTestsAction } from "../../../store/reducers/SearchTestsReducer/SearchTestsReducer";
import search from "../../../assets/images/search.svg";
import close from "../../../assets/images/close.svg";
import { useDebounce } from "../../../hooks/useDebounce";

import "./style.css";

export const MenuActionSearch = () => {

    const href = useNavigate()
    const dispatch = useHookDispatch()
    const [closet, setCloset] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>("")
    const isAnimation = useRef<boolean>(false)
    const debounceSearchTerm = useDebounce(searchText)
    const handleSearch = (value: string) => setSearchText(value)

    const handleAnimation = () => {
        setCloset(!closet)
        isAnimation.current = true
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            isAnimation.current = false
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (debounceSearchTerm) {
            dispatch(fetchSearchTest(searchText))
            dispatch(searchTestsAction.searchText(searchText))
            href(ERoutes.testSearchPage)
        }
    }, [debounceSearchTerm, dispatch, href, searchText])

    return (
        <>
            <Picture
                classPrefix={`${closet ?
                    "search-bar__icon-hidden" :
                    (isAnimation.current ?
                        "search-bar__icon iconOut" : "search-bar__icon")}`
                }
                src={search}
                handleAction={handleAnimation}
            />
            <div className={`${closet ?
                "search-bar__visible" :
                (isAnimation.current ? "search-bar__hidden serfOf"
                    : "search-bar__hidden")}`
            }>
                <TextField
                    classPrefix="search-bar__filed"
                    placeholder="Search here"
                    value={searchText}
                    disabled={false}
                    handleChange={(e) => handleSearch(e.target.value)}
                />
                <Picture
                    classPrefix="search-bar__close"
                    src={close}
                    handleAction={handleAnimation}
                />
            </div>
        </>
    )
}
