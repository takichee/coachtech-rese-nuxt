import axios from 'axios'

export const state = () => (
    {
        likedShops: [],
        likedShopIds: []
    }
)

export const mutations = {
    setLikedShops(state, shops) {
        state.likedShops.push(...shops)
    },
    setLikedShopIds(state) {
        state.likedShopIds = state.likedShops.map(obj => obj.shop_id)
    },
    resetLikedShops(state) {
        state.likedShops.splice(0, state.likedShops.length)
    },
    resetLikedShopIds(state) {
        state.likedShopIds.splice(0, state.likedShopIds.length)
    },
}

export const actions = {
    async getLikes({ rootState, commit }) {
        await commit('resetLikedShops')
        await commit('resetLikedShopIds')
        const userUid = await rootState.auth.userUid
        const user = await axios.get(
            `${process.env.baseUrl}/users/${userUid}`
        )
        const userId = await user.data.id
        const result = await axios.get(
            `${process.env.baseUrl}/likes/${userId}`
        )
        await commit('setLikedShops', result.data)
        await commit('setLikedShopIds')
    },
}

export const getters = {
    getLikedShops: (state) => {
        return state.likedShops
    },
    getLikedShopIds: (state) => {
        return state.likedShopIds
    }
}