import store from "../store/index";
import httpResource from "../http/httpResource";

export function parseApierror(error) {
    console.log("parseapierror", error);
    try {
        if (
            error &&
            error.hasOwnProperty("response") &&
            error.response.hasOwnProperty("data")
        ) {
            const apierror = error.response.data;
            return {
                status: apierror.status,
                statusCode: error.status,
                timestamp: apierror.timestamp,
                message: apierror.message
            };
        }
    } catch (parseError) {
        return {
            status: "INTERNAL_SERVER_ERROR",
            statusCode: 500,
            timestamp: new Date(),
            message: "Server is not responding.."
        };
    }
}

export function performLogout() {
    // const intervalName = store.getters.getIntervalName;
    // if (intervalName) clearInterval(intervalName);
    store.commit("setIsAuthenticated", false);
    store.commit("clearCurrentUser");
}

export async function refreshTokenInternal() {
    try {
        const response = await httpResource.post("/auth/refresh-token",{refreshToken: store.getters.getRefreshToken});
        if (response.status !== 200) performLogout();
    } catch (error) {
        performLogout();
    }
}

export async function refreshToken() {
    const response = await httpResource.post("/auth/refresh-token",{refreshToken: store.getters.getRefreshToken});
    store.commit("setAccessToken", response.data.accessToken);
    // store.commit("setRefreshToken", response.data.refreshToken);
    // store.commit("setCurrentUser", response.data.userData);
    // store.commit("isAuthenticated", true);
    return response.status;
}

export async function getAuthenticatedUser() {
    // получение данных профиля
    try {
        // const response = await httpResource.get("/profile/me");
        // if (response.status === 200) {
        //     const currentUser = response.data;
        const currentUser = {Name: "name", Surname: "Fierk"}
            store.commit("setCurrentUser", currentUser);
            store.commit("setIsAuthenticated", true);
            await refreshTokenInternal();
            const intervalName = setInterval(async () => {
                await refreshTokenInternal();
            }, intervalMilliSeconds);

            store.commit("setIntervalName", intervalName);
        // } else {
        //     performLogout();
        // }
    } catch (error) {
        performLogout();
    }
}

// export async function login() {
//     // получение данных профиля
//     try {
//         const response = await httpResource.get("/auth/login");
//         if (response.status === 200) {
//
//         await refreshTokenInternal();
//         const intervalName = setInterval(async () => {
//             await refreshTokenInternal();
//         }, intervalMilliSeconds);
//
//         store.commit("setIntervalName", intervalName);
//         // } else {
//         //     performLogout();
//         // }
//     } catch (error) {
//         performLogout();
//     }
// }

export const intervalMilliSeconds = 1800000; // 30 minutes