<template>
  <div class="m-8 w-3/4">
    <h1 class="text-gray-800 font-bold text-3xl mx-8">ご予約履歴</h1>
    <div class="my-4 px-4 md:px-12">
      <div class="flex flex-wrap -mx-1 lg:-mx-4">

      <div v-if="reservations == ''">
        <p class="mt-6 mb-4 text-lg">ご予約履歴がありません。</p>
        <nuxt-link to="/" class="text-blue-700 underline mt-6 text-lg">店舗一覧へ</nuxt-link>
      </div>

      <!-- Column -->
      <div v-else class="reservation-card w-full my-6" v-for="reservation in reservations" :key="reservation.id">
          <div class="flex shadow rounded-lg">
            <div class="reservation-card__left w-1/4">
              <img class="h-36 rounded-l-lg" :src="reservation.image_url" alt="">
            </div>
            <div class="reservation-card__left w-3/4 flex flex-col justify-between py-3 ml-3">
              <h2 class="text-2xl font-medium mb-2">{{ reservation.name }}</h2>
              <div class="flex mb-2 text-xl">
                <p class="pr-3" v-text="$dayjs(reservation.start_at).locale('ja').format('YYYY年M月D日')" />
                <p class="pr-3" v-text="$dayjs(reservation.start_at).locale('ja').format('h:mm')+'~'" />
                <p>{{ reservation.number }}名様</p>
              </div>
              <div class="reservation-card__right flex justify-end px-6 items-center">
                <button @click="cancelReservation(reservation.id)" v-if="!reservation.canceled" class="text-blue-700 underline">キャンセル</button>
                <p v-else-if="reservation.canceled" class="text-gray-500">キャンセル済み</p>
                <nuxt-link :to="`/shops/${reservation.shop_id}`" class="bg-blue-500 text-white py-1 px-6 ml-3 font-semibold rounded-lg">もう一度予約</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from '~/plugins/firebase'


export default {
  layout: 'mypage',
  data () {
    return {
      reservations: [],
      userUid: ''
    }
  },
  async fetch () {
    if (this.$store.state.auth.userId) {
      const userId = this.$store.state.auth.userId
      const result = await axios.get(`${process.env.baseUrl}/reservations/${userId}`)
      this.reservations = result.data
    } else {
      firebase.auth().onAuthStateChanged(async (user) => {
        await this.$store.dispatch('auth/setUserInfo', user.uid)
        const userId = this.$store.state.auth.userId
        const result = await axios.get(`${process.env.baseUrl}/reservations/${userId}`)
        this.reservations = result.data
      })
    }
  },
  methods: {
    async cancelReservation(reservationId) {
      const reservation_id = reservationId
      await axios.put(`${process.env.baseUrl}/reservations/${reservation_id}`, {
        canceled: true
      })
      window.location.reload()
    }
  }
}
</script>