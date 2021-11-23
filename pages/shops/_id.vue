<template>
  <div>
    <div class="container my-12 mx-auto px-4 md:px-12">
      <div class="flex flex-wrap -mx-1 lg:mx-12">

        <!-- Shop Detail -->
        <div class="mb-12 px-2 w-full lg:w-1/2">
          <header>
            <h1 class="text-4xl mb-6 font-bold">{{ shop.name }}</h1>
          </header>
          <div>
            <img :src="shop.image_url"
              class="mb-6">
            <div class="flex flex-start text-blue-700 text-lg mb-6">
              <p>#{{ shop.area }}</p>
              <p class="ml-2">#{{ shop.kind }}</p>
            </div>
            <div>
              <p>
                {{ shop.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Reservation Form -->
        <div class="my-1 px-2 px-1 w-full lg:w-1/2">
          <div class="">
            <header class="bg-yellow-400 rounded-t-lg">
              <h1 class="text-white text-center py-3">ご予約</h1>
            </header>
            <form class="w-full bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg" action="">
              <label class="text-gray-700 font-bold py-2" for="">日付</label>
              <input class="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3" type="text">
              <label class="text-gray-700 font-bold py-2" for="">時間</label>
              <input class="text-gray-700 shadow border rounded border-gray-300 mb-3 py-1 px-3 focus:outline-none focus:shadow-outline" type="password">
              <label class="text-gray-700 font-bold py-2" for="">人数</label>
              <input class="text-gray-700 shadow border rounded border-gray-300 mb-3 py-1 px-3 focus:outline-none focus:shadow-outline" type="password">
              <div class="flex align-center m-auto items-center my-4">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4">
                  予約する
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios, params }) {
    const shop_id = `${params.id}`
    const shop = await $axios.$get(`http://localhost:8000/api/v1/shops/${shop_id}`)

    return { shop_id, shop }
  }
}
</script>