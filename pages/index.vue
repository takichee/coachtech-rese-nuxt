<template>
  <div>
    <div class="container my-12 mx-auto px-4 md:px-12">
      <div class="flex flex-wrap -mx-1 lg:-mx-4">

        <!-- Column -->
        <div v-for="shop in shops" :key="shop.id"
            class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">

            <!-- Article -->
            <article class="overflow-hidden rounded-lg shadow-lg">
              <div class="">
                <a href="#">
                    <img alt="placeholder" class="block h-auto w-full" :src="shop.image_url">
                </a>
              </div>

                <header class="flex flex-col items-left justify-between leading-tight p-2 md:p-4">
                    <h1 class="text-2xl">
                        <a class="no-underline hover:underline text-black" href="#">
                            {{ shop.name }}
                        </a>
                    </h1>
                    <div class="flex text-sm text-blue-500">
                        <p>#{{ shop.area }}</p>
                        <p class="ml-2">#{{ shop.kind}}</p>
                    </div>
                </header>

                <footer class="flex items-center justify-between leading-none p-2 md:p-4">
                    <nuxt-link
                      to="#"
                      class="w-1/2 text-center bg-blue-400 text-white p-2 rounded font-semibold text-sm hover:bg-yellow-400">
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
  data () {
    return {
      shops: []
    }
  },
  mounted () {
    axios.get('http://localhost:8000/api/v1/shops')
    .then((res) =>
      this.shops = res.data)
    .catch((error) => {
      console.log(error)
      this.shop = "ERROR"
    })
  },
}
</script>
