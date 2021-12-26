import axios from 'axios'

export const state = () => (
    {
        shops: []
    }
)

export const mutations = {
    resetShops(state) {
        state.shops.splice(0, state.shops.length)
    },
    fetchShops(state, shops) {
        state.shops.push(...shops)
    }
}

export const actions = {
    async getShops({ commit }) {
        await commit('resetShops')
        const data = await axios.get(
            process.env.baseUrl +
            '/shops'
        )
        commit('fetchShops', data.data)
    }
}

export const getters = {
    getShops: (state) => {
        return state.shops
    }
}