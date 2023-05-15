import { useEffect} from "react"
import { fetchUserDate } from "../api/FetchUserData/fetchUserDate"
import { useHookDispatch } from "../store/reducers/redux"

const useAuth = () => {
    const dispatch = useHookDispatch()
    const userData = localStorage.getItem('userData')
    useEffect(()=>{
        if (userData) {
            	dispatch(fetchUserDate(JSON.parse(userData).id))
            }
    },[userData])

    return !!userData
}

export default useAuth