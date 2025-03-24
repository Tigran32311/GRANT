import store from "../store/index";
import httpResource from "../http/httpResource";
import router from "@/router/index.js";

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
    store.commit("clearCurrentUser");
}

export async function refreshToken() {
    try {
        const response = await httpResource.post("/auth/refresh-token",{refreshToken: store.getters.getRefreshToken});
        if (response.status==200) {
            store.commit("setAccessToken", response.data.accessToken);
            return response.status;
        }
    } catch (error) {
        // if (error.status==401) {
            // await performLogout()
        // }
    }
}

export async function getOrgs() {
    try {
        const response = await httpResource.get("/getOrgs",{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken
            }
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await getOrgs()
            }
        } else {
            return apierror
        }
    }
}

export async function getRegions() {
    try {
        const response = await httpResource.get("/getRegions",{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken
            }
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await getRegions()
            }
        } else {
            return apierror
        }
    }
}

export async function getDirectors() {
    try {
        const response = await httpResource.get("/admin/allDir",{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken
            }
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await getDirectors()
            }
        } else {
            return apierror
        }
    }
}

export async function getRoads() {
    try {
        const response = await httpResource.get("/getRoads",{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken
            }
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await getRoads()
            }
        } else {
            return apierror
        }
    }
}

export async function getProfileDir() {
    try {
        const response = await httpResource.get("/director/getProfileData",{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken
            }
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await getProfileDir()
            }
        } else {
            return apierror
        }
    }
}

export async function getProfile() {
    try {
        const response = await httpResource.get("/ph_per/getProfileData",{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken
            }
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await getProfile()
            }
        } else {
            return apierror
        }
    }
}

export async function getMarkersMap(data) {
    try {
        const response = await httpResource.get("/getMyDownloads?year="+data,{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken
            }
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await getMarkersMap(data)
            }
        } else {
            return apierror
        }
    }
}

export async function getEmployees() {
    try {
        const response = await httpResource.get("/director/getEmps",{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken
            }
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await getEmployees()
            }
        } else {
            return apierror
        }
    }
}

export async function addDirector(addData) {
    try {
        const response = await httpResource.post("/admin/createDir",addData,{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken
            }
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await addDirector(addData)
            }
        } else {
            return apierror
        }
    }
}

export async function sendFormUtil(addData) {
    try {
        const response = await httpResource.post("/video/upload",addData,{
            headers: {
                // 'Accept': 'application/json',
                Authorization: "Bearer "+store.getters.getAccessToken,
                "Content-Type": "multipart/form-data",
            }
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await sendFormUtil(addData)
            }
        } else {
            return apierror
        }
    }
}

export async function editProfileDir(addData) {
    try {
        const response = await httpResource.post("/director/editProfile",addData,{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken
            }
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await editProfileDir(addData)
            }
        } else {
            return apierror
        }
    }
}

export async function editProfile(addData) {
    try {
        const response = await httpResource.post("/ph_per/editProfile",addData,{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken
            }
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await editProfile(addData)
            }
        } else {
            return apierror
        }
    }
}

export async function addUser(addData) {
    try {
        const response = await httpResource.post("/director/createEmp",addData,{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken
            }
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await addDirector(addData)
            }
        } else {
            return apierror
        }
    }
}

export async function editUser(addData) {
    try {
        const response = await httpResource.post("/director/editEmp",addData,{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken
            }
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await editUser(addData)
            }
        } else {
            return apierror
        }
    }
}

export async function banUser(addData) {
    try {
        const response = await httpResource.post("/director/banEmp",addData,{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken
            }
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await banUser(addData)
            }
        } else {
            return apierror
        }
    }
}

export async function activateUser(addData) {
    try {
        const response = await httpResource.post("/director/activateEmp",addData,{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken
            }
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await activateUser(addData)
            }
        } else {
            return apierror
        }
    }
}

export async function editRoad(addData) {
    try {
        const response = await httpResource.post("/admin/editRoad",addData,{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken
            }
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await editRoad(addData)
            }
        } else {
            return apierror
        }
    }
}

export async function deleteRoad(addData) {
    try {
        const response = await httpResource.post("/admin/deleteRoad",addData,{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken
            }
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await editRoad(addData)
            }
        } else {
            return apierror
        }
    }
}

export async function addRoadFunc(addData) {
    try {
        const response = await httpResource.post("/admin/createRoad",addData,{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken
            }
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await addRoadFunc(addData)
            }
        } else {
            return apierror
        }
    }
}

export async function addOrg(addData) {
    try {
        const response = await httpResource.post("/admin/createOrg",addData,{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken
            }
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await addOrg(addData)
            }
        } else {
            return apierror
        }
    }
}

export async function editOrg(addData) {
    try {
        const response = await httpResource.post("/admin/editOrg",addData,{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken
            }
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await editOrg(addData)
            }
        } else {
            return apierror
        }
    }
}

export async function deleteOrg(addData) {
    try {
        const response = await httpResource.post("/admin/deleteOrg",addData,{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken
            }
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await deleteOrg(addData)
            }
        } else {
            return apierror
        }
    }
}


export async function editDirector(editData) {
    try {
        const response = await httpResource.post("/admin/editDir",editData,{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken
            }
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await editDirector(editData)
            }
        } else {
            return apierror
        }
    }
}

export async function generateDoc(fileName,genDoc) {
    try {
        const response = await httpResource.get("/genDoc?fileName="+fileName+"&trafficRegCardId="+genDoc,{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken,
            },
            responseType: 'blob',
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await generateDoc(fileName,genDoc)
            }
        } else {
            return apierror
        }
    }
}

export async function getIntensity(traficId) {
    try {
        const response = await httpResource.get("/getIntensity?trafficRegCardId="+traficId,{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken,
            },
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await getIntensity(traficId)
            }
        } else {
            return apierror
        }
    }
}

export async function deleteDirector(deleteId) {
    try {
        const response = await httpResource.post("/admin/deleteDir?dirId="+deleteId,"",{
            headers: {
                Authorization: "Bearer "+store.getters.getAccessToken
            }
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        const apierror = parseApierror(error);
        if (apierror.statusCode === 401) {
            const refresh = await refreshToken()
            if (refresh!==200) {
                performLogout();
                await router.push("/")
                location.reload()
            } else {
                return await deleteDirector(deleteId)
            }
        } else {
            return apierror
        }
    }
}