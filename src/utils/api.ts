import axios from "axios";
import { HOST } from "./host";

const HOST_PORT = HOST;
const BASE_URL = `http://${HOST_PORT}/api`;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    async config => {
        const token = localStorage.getItem("token");
        if (token) {
            //config.headers["Authorization"] = `Bearer ${token}`;  // this var for development
            config.headers["Authorization"] = `${token}`;   // this is for deploy
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => {
        return response
    },
    async error => {

        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
                try {
                    const response = await axios.post(`${BASE_URL}/auth/refresh-token`, { refreshToken: refreshToken });
                    const { accessToken } = response.data;
                    localStorage.setItem("token", `${accessToken}`);
                    originalRequest.headers["Authorization"] = `${accessToken}`;

                    return api(originalRequest);
                } catch (refreshError) {
                    localStorage.clear();
                    window.location.href = "/signin";
                    return Promise.reject(refreshError);
                }
            } else {
                window.location.href = "/signin";
            }
        }
        return Promise.reject(error);
    }
);


export default api;