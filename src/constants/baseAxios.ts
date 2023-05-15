import axios from "axios"

export const axiosBase = axios.create({
	baseURL: "http://10.55.1.39:81/",
})
axiosBase.interceptors.request.use((config) => {
	const ls = localStorage.getItem("userData")
	config.headers["Authorization"] = ls && "Bearer " + JSON.parse(ls).token
	return config
})
