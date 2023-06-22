import axios from "axios"

export const axiosBase = axios.create({
	baseURL: "http://spacecapsalex-002-site1.atempurl.com/",
})
axiosBase.interceptors.request.use((config) => {
	const ls = localStorage.getItem("userData")
	config.headers["Authorization"] = ls && "Bearer " + JSON.parse(ls).token
	return config
})
