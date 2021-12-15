import axios from 'axios'

export const state = () => ({
    searchedShops: [],
    area: '',
    kind: '',
    keyword: '',
})

export const mutations = {
    resetShops(state) {
        state.searchedShops.splice(0, state.searchedShops.length)
    },
    setArea(state, area) {
        state.area = area
    },
    setKind(state, kind) {
        state.kind = kind
    },
    setKeyword(state, keyword) {
        state.keyword = keyword
    },
    async searchShops(state, shops) {
        state.searchedShops.push(...shops)
    }
}

export const actions = {
    createFilter({ commit, dispatch }, { area, kind, keyword}) {
        this.$router.push('/')
        commit('resetShops')
        commit('setArea', area)
        commit('setKind', kind)
        commit('setKeyword', keyword)
        dispatch('fetchShops', { area, kind, keyword })
    },
    async fetchShops({commit}, { area, kind, keyword }) {
        const data = axios.get(
            'http://localhost:8000/api/v1/shops?area='
            + area
            + '&kind='
            + kind
            + '&keyword='
            + keyword
        )
        const result = await data
        console.log('area is ' + area)
        console.log('kind is ' + kind)
        console.log('keyword is ' + keyword)
        console.log('result is ' + result.data)
        commit('searchShops', result.data)
    }
}

export const getters = {
    getShops: (state) => {
        return state.searchedShops
    }
}