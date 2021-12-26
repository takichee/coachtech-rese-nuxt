<template>
  <div>
    <AskSignUp />

    <div class="container my-12 mx-auto px-4 md:px-12">
      <!-- Searched shops -->
      <div v-if="searchedShops != ''" class="flex flex-wrap -mx-1 lg:-mx-4">
        <div v-for="(shop, id) in searchedShops" :key="id"
          class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4"
        >
          <article class="overflow-hidden rounded-lg shadow-lg">
            <div>
              <nuxt-link :to="'shops/'+ shop.id" target="_blank">
                <img :alt="shop.name" class="block h-auto w-full" :src="shop.image_url">
              </nuxt-link>
            </div>
            <header class="flex flex-col items-left justify-between leading-tight p-2 md:p-4">
                <h1 class="text-2xl">
                  <a class="no-underline hover:underline text-black" :href="'shops/'+ shop.id">
                      {{ shop.name }} Searched
                  </a>
                </h1>
                <div class="flex text-sm text-blue-700">
                  <p>#{{ shop.area }}</p>
                  <p class="ml-2">#{{ shop.kind }}</p>
                </div>
            </header>
            <footer class="flex items-center justify-between leading-none p-2 md:p-4">
                <nuxt-link :to="'shops/'+ shop.id" target="_blank"
                  class="duration-150 w-1/2 text-center bg-blue-500 text-white p-2 rounded font-semibold text-sm hover:bg-blue-700">
                    詳細を見る
                </nuxt-link>
                <button
                  @click="changeLike(shop.id)"
                  type="submit">
                    <span class="hidden">Like</span>
                    <font-awesome-icon icon="heart"
                      :class='[likedShopIds.includes(shop.id) ? "text-red-400 text-3xl" : "text-gray-400 text-3xl"]' />
                </button>
            </footer>
          </article>
        </div>
      </div>

      <!-- All shops -->
      <div v-else class="flex flex-wrap -mx-1 lg:-mx-4">
        <div v-for="(shop, id) in shops" :key="id"
          class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4"
        >
          <article class="overflow-hidden rounded-lg shadow-lg">
            <div>
              <nuxt-link :to="'shops/'+ shop.id" target="_blank">
                  <img :alt="shop.name" class="block h-auto w-full" :src="shop.image_url">
              </nuxt-link>
            </div>
            <header class="flex flex-col items-left justify-between leading-tight p-2 md:p-4">
                <h1 class="text-2xl">
                    <a class="no-underline hover:underline text-black" :href="'shops/'+ shop.id">
                        {{ shop.name }} All
                    </a>
                </h1>
                <div class="flex text-sm text-blue-700">
                    <p>#{{ shop.area }}</p>
                    <p class="ml-2">#{{ shop.kind }}</p>
                </div>
            </header>
            <footer class="flex items-center justify-between leading-none p-2 md:p-4">
                <nuxt-link :to="'shops/'+ shop.id" target="_blank"
                  class="duration-150 w-1/2 text-center bg-blue-500 text-white p-2 rounded font-semibold text-sm hover:bg-blue-700">
                    詳細を見る
                </nuxt-link>
                <button
                  @click="changeLike(shop.id)"
                  type="submit">
                    <span class="hidden">Like</span>
                    <font-awesome-icon icon="heart"
                      :class='[likedShopIds.includes(shop.id) ? "text-red-400 text-3xl" : "text-gray-400 text-3xl"]' />
                </button>
            </footer>
          </article>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import firebase from '~/plugins/firebase'

export default {
  data () {
    return {
    }
  },
  async fetch() {
    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          await this.$store.dispatch('auth/setUserInfo', user.uid)
          let userId = this.$store.state.auth.userId
          await this.$store.dispatch('shop/getShops')
          await this.$store.dispatch('likes/getLikes', {userId})
        } else {
          await this.$store.dispatch('shop/getShops')
        }
      })
  },
  computed: {
    ...mapGetters({
      shops: 'shop/getShops'
    }),
    ...mapGetters({
      searchedShops: 'filter/getShops'
    }),
    ...mapGetters({
      likedShopIds: 'likes/getLikedShopIds'
    })
  },
  methods: {
    async changeLike(shopId) {
      if (this.$store.state.auth.userId) {
        await axios.post('http://localhost:8000/api/v1/likes', {
          user_id: this.$store.state.auth.userId,
          shop_id: shopId
        })
        let userId = this.$store.state.auth.userId
        this.$store.dispatch('likes/getLikes', { userId })
      } else {
        alert('お気に入り機能には会員登録が必要です。')
      }
    }
  }
}
</script>
