import axios from "axios";

const axiosHttpClient = axios.create({
    withCredentials: true,
    baseURL: `${import.meta.env.VITE_URL_BACKEND}`,
});

axiosHttpClient.interceptors.request.use(async (reqConfig) => {
    reqConfig.headers.Accept = "application/json";
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
        reqConfig.headers.Authorization = `Bearer ${accessToken}`;
    }
    return reqConfig;
});

axiosHttpClient.interceptors.response.use(
    (response) => {
        return {
            isError: false,
            ...response,
        };
    },
    (error) => {
        const { response } = error;
        if (response.status) {
            switch (response.status) {
                case 401:
                    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
                    return {
                        isError: true,
                        status: 401,
                        message: response.data.message ?? "error",
                        errors: response.data.errors,
                    };
                case 419:
                    throw Error("CSRF TOKENS DO NOT MATCH!");
                case 422:
                    return {
                        isError: true,
                        status: 422,
                        message: response.data.message ?? "error",
                        errors: response.data.errors,
                    };
                default:
                    return {
                        isError: true,
                        status: response.status,
                        message: response.data.message ?? "error",
                    };
            }
        } else {
            return {
                isError: true,
                message: response.data.message ?? "error",
            };
        }
    }
);

export default axiosHttpClient;
