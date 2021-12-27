import firebase from '~/plugins/firebase.js'
import axios from 'axios'

export const state = () => ({
    userId: '',
    userName: '',
    userUid: '',
    userEmail: '',
    loggedIn: false,
})

export const mutations = {
    loginStatusChange(state, status) {
        state.loggedIn = status
    },
    setUserUid(state, userUid) {
        state.userUid = userUid
    },
    setUserEmail(state, userEmail) {
        state.userEmail = userEmail
    },
    setUserId(state, userId) {
        state.userId = userId
    },
    setUserName(state, userName) {
        state.userName = userName
    }
}

export const actions = {
    async register({ commit }, { email, password }) {
        const { user } = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            commit('loginStatusChange', true)
            console.log('Regist a user was successful')
            commit('setUserUid', user.uid)
            commit('setUserEmail', user.email)
    },
    async login({ commit, dispatch }, payload) {
        const { user } = await firebase
            .auth()
            .signInWithEmailAndPassword(payload.email, payload.password)
        commit('loginStatusChange', true)
        console.log('Login was successful')
        commit('setUserUid', user.uid)
        commit('setUserEmail', user.email)
        await dispatch('getUserInfo', user.uid)
        await this.$router.back()
    },
    async setUserInfo({ commit }, uid ) {
        const currentUid = await uid
        await commit("setUserUid", currentUid)
        commit("loginStatusChange", currentUid ? true : false)
        const user = await axios.get(`${process.env.baseUrl}/users/${uid}`)
        commit("setUserEmail", user.data.email)
        commit('setUserId', user.data.id)
        commit('setUserName', user.data.name)
    },
    async logout({ commit }) {
        await firebase.auth().signOut()
        commit('loginStatusChange', false)
        console.log('Logout was successful')
        commit('likes/resetLikedShopIds', null, { root: true })
        this.$router.push('/')
    },
    async getUserInfo({commit}, uid) {
        const data = await axios.get(
            `${process.env.baseUrl}/users/${uid}`
        )
        commit('setUserId', data.data.id)
        commit('setUserName', data.data.name)
    }
}

export const getters = {
    getUserUid(state) {
        return state.userUid
    },
    getUserEmail(state) {
        return state.userEmail
    },
    isAuthenticated(state) {
        return state.loggedIn != false
    }
}
