import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
const state = {
    isAuthenticated: cookies.get('isAuthenticated'),
    accessToken: cookies.get('accessToken'),
    refreshToken: cookies.get('refreshToken'),
    userData: cookies.get('userData'),
    // userData: {
    //     firstname: cookies.get('userData')['firstname'],
    //     surname: cookies.get('userData')['surname'],
    //     patronymic: cookies.get('userData')['patronymic'],
    //     email: cookies.get('userData')['email'],
    // },
    intervalName: ""
};

const getters = {
    getIsAuthenticated(state) {
        return state.isAuthenticated;
    },
    getAccessToken(state) {
        return state.accessToken;
    },
    getRefreshToken(state) {
        return state.refreshToken;
    },
    getCurrentUser(state) {
        return state.userData;
    },
    getIntervalName(state) {
        return state.intervalName;
    }
};

const mutations = {
    setIsAuthenticated(state, isAuthenticated) {
        state.isAuthenticated = isAuthenticated;
        cookies.set('isAuthenticated',isAuthenticated)
    },
    setAccessToken(state, token) {
        state.accessToken = token;
        cookies.set('accessToken',token)
    },
    setRefreshToken(state, token) {
        state.refreshToken = token;
        cookies.set('refreshToken',token)
    },
    setCurrentUser(state, currentUser) {
        state.userData = currentUser
        cookies.set('userData',currentUser)
        // state.userData.firstname = currentUser.firstname;
        // state.userData.surname = currentUser.surname;
        // state.userData.email = currentUser.email;
        // state.userData.patronymic = currentUser.patronymic;
    },
    setIntervalName(state, intervalName) {
        state.intervalName = intervalName;
    },
    clearCurrentUser(state) {
        state.userData = "";
        state.isAuthenticated = false;
        state.accessToken = "";
        state.refreshToken = "";
        cookies.set('isAuthenticated',false)
        cookies.set('userData',"")
        cookies.set('accessToken',"")
        cookies.set('refreshToken',"")
    }
};

const actions = {
    async login({ commit, dispatch }, loginData) {},
    async getCurrentUser({ commit, dispatch }) {},
    async getAccessToken({ commit, dispatch }) {},
    async getRefreshToken({ commit, dispatch }) {},
    async refresh({ commit, dispatch, getters }) {},
    async logout({ commit, dispatch, getters }) {}
};

export default {
    namespaced: false,
    state,
    getters,
    mutations,
    actions
};