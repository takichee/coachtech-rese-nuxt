import firebase from '~/plugins/firebase.js'

export const state = () => ({
    userUid: '',
    userEmail: '',
    loggedIn: false,
})

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

export const mutations = {
    loginStatusChange(state, status) {
        state.loggedIn = status
    },
    setUserUid(state, userUid) {
        state.userUid = userUid
    },
    setUserEmail(state, userEmail) {
        state.userEmail = userEmail
    }
}

export const getters = {
    getUserUid(state) {
        return state.userUid
    },
    getUserEmail(state) {
        return state.userEmail
    }
}
