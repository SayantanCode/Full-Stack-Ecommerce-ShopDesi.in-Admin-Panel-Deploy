import axios from "axios";
import cookies from "js-cookie";
export const axiosInstance = axios.create({
    baseURL: "http://localhost:1500"
})
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token") || cookies.get("token") || sessionStorage.getItem("token");
    if (token) {
        config.headers["x-auth-admin-token"] = token;
    }
    return config;
})