import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootReducer } from "../store"

export const useHookDispatch = () => useDispatch<AppDispatch>()
export const useHookSelector: TypedUseSelectorHook<RootReducer> = useSelector