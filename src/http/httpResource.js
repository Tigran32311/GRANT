import axios from "axios";
import {performLogout, refreshToken} from "@/utils/util.js";
import router from "@/router/index.js";

const isHandlerEnabled = (config = {}) => {
    return !(config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled);
};

// axiosInstance.get('/v2/api-endpoint', { handlerEnabled: false })

const instance = axios.create({
    // baseURL: process.env.VUE_APP_RESOURCE_SERVER,
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
    timeout: 10000,
    headers: {
        // "Cache-Control": "no-cache",
        // "Content-Type": "application/x-www-form-urlencoded",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    }

});

const requestHandler = request => {
    if (isHandlerEnabled(request)) {
        console.log("Request Interceptor", request);
    }
    return request;
};

const errorHandler = error => {
    if (isHandlerEnabled(error.config)) {
        console.log("Error Interceptor", error);

        if (error.response) {
            // if (error.response.status === 401) {
                // const refresh = refreshToken()
                // if (refresh!==200) {
                    // performLogout();
                    // router.push("/")
                    // location.reload()
                // }
            // }
        }
    }
    return Promise.reject({ ...error });
};

const successHandler = response => {
    if (isHandlerEnabled(response.config)) {
        console.log("Response Interceptor", response);
    }
    return response;
};

instance.interceptors.request.use(request => requestHandler(request));

instance.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
);

export default instance;