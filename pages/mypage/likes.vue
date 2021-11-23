<template>
  <div class="m-8 w-3/4">
    <h1 class="text-gray-800 font-bold text-3xl mx-8">お気に入りレストラン一覧</h1>
    <p class="hidden">お気に入りレストランがありません。</p>
    <div class="container my-6 mx-auto px-4 md:px-12">
      <div class="flex flex-wrap -mx-1 lg:-mx-4">

        <!-- Column -->
        <div v-for="like in likes" :key="like.id"
            class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

            <!-- Article -->
            <article class="overflow-hidden rounded-lg shadow-lg">
              <div class="">
                <nuxt-link :to="'shops/'+ like.shop_id">
                    <img alt="placeholder" class="block h-auto w-full" :src="like.image_url">
                </nuxt-link>
              </div>

                <header class="flex flex-col items-left justify-between leading-tight p-2 md:p-4">
                    <h1 class="text-2xl">
                        <a class="no-underline hover:underline text-black" :href="'shops/'+ like.shop_id">
                            {{ like.name }}
                        </a>
                    </h1>
                    <div class="flex text-sm text-blue-700">
                        <p>#{{ like.area }}</p>
                        <p class="ml-2">#{{ like.kind}}</p>
                    </div>
                </header>

                <footer class="flex items-center justify-between leading-none p-2 md:p-4">
                    <nuxt-link :to="'shops/'+ like.shop_id"
                      class="duration-150 w-1/2 text-center bg-blue-500 text-white p-2 rounded font-semibold text-sm hover:bg-blue-700">
                        予約する
                    </nuxt-link>
                    <a class="no-underline text-grey-darker hover:text-red-dark" href="#">
                        <span class="hidden">Like</span>
                        <font-awesome-icon icon="heart" class="text-gray-400 text-3xl" />
                    </a>
                </footer>

            </article>
            <!-- END Article -->

        </div>
        <!-- END Column -->

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'mypage',
  data () {
    return {
      likes: []
    }
  },
  mounted () {
    axios.get('http://localhost:8000/api/v1/likes/1')
    .then((res) =>
      this.likes = res.data)
    .catch((error) => {
      console.log(error)
      this.likes = "ERROR"
    })
  },
}
</script>