import firebase from '~/plugins/firebase.js'

export const state = () => ({
    userUid: '',
    userName: '',
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
    setUserName(state, userName) {
        state.userName = userName
    },
    setUserImage(state, userImage) {
        state.userImage = userImage
    },
    setUserEmail(state, userEmail) {
        state.userEmail = userEmail
    }
}

export const actions = {
    login({ commit }, payload) {
        firebase
            .auth()
            .signInWithEmailAndPassword(payload.email, payload.password)
        .then((result) => {
            const user = result.user
            commit('loginStatusChange', true)
            console.log('Login was successful')
            commit('setUserUid', user.uid)
            commit('setUserEmail', user.email)
            this.$router.push('/')
        })
        .catch((error) => {
            const errorCode = error.code
            console.log('error: ' + errorCode)
        })
    },

    onAuth({ commit }) {
        firebase.auth().onAuthStateChanged(user => {
            user = user ? user : {}
            commit('setUserUid', user.uid)
            commit('setUserName', user.displayName)
            commit('setUserEmail', user.email)
            commit('loginStatusChange', user.uid ? true : false)
        })
    },

    logout({ commit }) {
        firebase.auth().signOut()
        .then(() => {
            commit('loginStatusChange', false)
            console.log('Logout was successful')
            this.$router.push('')
        })
        .catch((error) => {
            const errorCode = error.code
            console.log('error: ' + errorCode)
        })
    }
}

export const getters = {
    getUserUid(state) {
        return state.userUid
    },
    getUserName(state) {
        return state.userName
    },
    getUserImage(state) {
        return state.userImage
    },
    getUserEmail(state) {
        return state.userEmail
    }
}

