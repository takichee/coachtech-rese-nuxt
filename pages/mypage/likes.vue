<template>
  <div class="m-8 w-3/4">
    <h1 class="text-gray-800 font-bold text-3xl mx-8">お気に入りレストラン一覧</h1>
    <p class="hidden">お気に入りレストランがありません。</p>
    <div class="container my-6 mx-auto px-4 md:px-12">
      <div class="flex flex-wrap -mx-1 lg:-mx-4">

        <div v-if="likedShops == ''">
          <p class="mt-6 mb-4 text-lg">お気に入りレストランがありません。</p>
          <nuxt-link to="/" class="text-blue-700 underline mt-6 text-lg">店舗一覧へ</nuxt-link>
        </div>

        <!-- Column -->
        <div v-for="shop in likedShops" :key="shop.id"
            class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <article class="overflow-hidden rounded-lg shadow-lg">
              <div>
                <nuxt-link :to="'shops/'+ shop.shop_id">
                    <img alt="placeholder" class="block h-auto w-full" :src="shop.image_url">
                </nuxt-link>
              </div>
              <header class="flex flex-col items-left justify-between leading-tight p-2 md:p-4">
                  <h1 class="text-2xl">
                      <a class="no-underline hover:underline text-black" :href="'shops/'+ shop.shop_id">
                          {{ shop.name }}
                      </a>
                  </h1>
                  <div class="flex text-sm text-blue-700">
                      <p>#{{ shop.area }}</p>
                      <p class="ml-2">#{{ shop.kind}}</p>
                  </div>
              </header>
              <footer class="flex items-center justify-between leading-none p-2 md:p-4">
                <nuxt-link :to="'shops/'+ shop.shop_id"
                  class="duration-150 w-1/2 text-center bg-blue-500 text-white p-2 rounded font-semibold text-sm hover:bg-blue-700">
                    予約する
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

export default {
  layout: 'mypage',
  async mounted() {
    await this.$store.dispatch('shop/getShops')
    await this.$store.dispatch('likes/getLikes')
    return
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
    }),
    ...mapGetters({
      likedShops: 'likes/getLikedShops'
    })
  },
  methods: {
    async changeLike(shopId) {
      await axios.post('http://localhost:8000/api/v1/likes', {
        user_id: this.$store.state.auth.userId,
        shop_id: shopId
      })
      this.$store.dispatch('likes/getLikes')
    }
  }
}
</script>