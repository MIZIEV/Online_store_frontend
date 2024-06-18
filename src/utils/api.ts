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
            config.headers["Authorization"] = `Bearer ${token}`;
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
        console.log("Response error:", error.response);

        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            console.log("OUTSIDE REFRSH method")
            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
                console.log("INSIDE REFRSH method")

                try {
                    console.log("TRY REFRSH method")
                    console.log(refreshToken)


                    const response = await axios.post(`${BASE_URL}/auth/refresh-token`, { refreshToken: refreshToken });
                    const { accessToken } = response.data;
                    localStorage.setItem("token", `${accessToken}`);
                    originalRequest.headers["Authorization"] = `${accessToken}`;

                    console.log("END OF TRY REFRSH method")

                    return api(originalRequest);
                } catch (refreshError) {
                    console.log("ERROR REFRSH method")

                    console.error("Refresh token failed", refreshError);
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