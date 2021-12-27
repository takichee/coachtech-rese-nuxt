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
            <div class="w-full bg-white py-5 px-8 rounded-lg shadow-lg" >

              <div v-if="this.$store.state.auth.loggedIn">
                <validation-observer ref="obs" v-slot="ObserverProps">
                  <form @submit.prevent class="flex flex-col">
                    <validation-provider v-slot="{errors}" rules="required">
                      <label class="text-gray-700 font-bold py-2" for="日付">日付</label>
                      <input v-model="date" name="日付" class="w-full text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3" type="date">
                      <p class="text-red-600">{{errors[0]}}</p>
                    </validation-provider>
                    <validation-provider v-slot="{errors}" rules="required">
                      <label class="text-gray-700 font-bold py-2" for="開始時間">時間</label>
                      <select v-model="time" name="開始時間" id="time" class="w-full text-gray-700 shadow border rounded border-gray-300 mb-3 py-1 px-3 focus:outline-none focus:shadow-outline">
                        <option value="18:00">18:00</option>
                        <option value="18:30">18:30</option>
                        <option value="19:00">19:00</option>
                        <option value="19:30">19:30</option>
                        <option value="20:00">20:00</option>
                        <option value="20:30">20:30</option>
                      </select>
                      <p class="text-red-600">{{errors[0]}}</p>
                    </validation-provider>
                    <validation-provider v-slot="{errors}" rules="required">
                      <label class="text-gray-700 font-bold py-2" for="人数">人数</label>
                      <select v-model="number" name="人数" class="w-full text-gray-700 shadow border rounded border-gray-300 mb-3 py-1 px-3 focus:outline-none focus:shadow-outline">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                      <p class="text-red-600">{{errors[0]}}</p>
                    </validation-provider>
                    
                    <div class="flex align-center m-auto items-center my-4">
                      <button
                        @click="makeReservation"
                        type="submit"
                        :disabled="ObserverProps.invalid"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4">
                        予約する
                      </button>
                    </div>
                  </form>
                </validation-observer>
              </div>

              <div v-else>
                <p class="flex justify-center">ご予約にはログインが必要です。</p>
                <div class="flex px-4 py-3 sm:px-6 justify-center">
                  <nuxt-link to="/auth/register" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                    かんたん登録
                  </nuxt-link>
                  <nuxt-link to="/auth/login" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    ログイン
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      date: '',
      time: '',
      number: '',
      minDate: ''
    }
  },
  computed: {
    getMinDate() {
      minDate = new Date();
    }
  },
  async asyncData ({ $axios, params }) {
    const shop_id = params.id
    const shop = await $axios.$get(`http://localhost:8000/api/v1/shops/${shop_id}`)
    return { shop }
  },
  methods: {
    makeReservation () {
      const startAt = this.date + ' ' + this.time
      const shopId = this.$route.params.id
      this.$axios.post('http://localhost:8000/api/v1/reservations',
            {
              start_at: startAt,
              number: this.number,
              user_id: this.$store.state.auth.userId,
              shop_id: shopId
            }
      )
      this.$router.push('/done')
    }
  }
}
</script>
