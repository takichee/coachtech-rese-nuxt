<template>
  <div class="m-8 w-3/4">
    <h1 class="text-gray-800 font-bold text-3xl mx-8">ご予約履歴</h1>
    <p class="hidden">ご予約履歴がありません。</p>
    <div class="my-4 px-4 md:px-12">
      <div class="flex flex-wrap -mx-1 lg:-mx-4">

      <!-- Column -->
       <div class="reservation-card w-full my-6" v-for="reservation in reservations" :key="reservation.id">
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
                <button @click="cancelReservation" v-if="!reservation.canceled" class="text-blue-700 underline">キャンセル</button>
                <p v-else-if="reservation.canceled" class="text-gray-500">キャンセル済み</p>
                <button class="bg-blue-500 text-white py-1 px-6 ml-3 font-semibold rounded-lg">もう一度予約</button>
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
export default {
  layout: 'mypage',
  data () {
    return {
      reservations: []
    }
  },
  mounted () {
    axios.get('http://localhost:8000/api/v1/reservations/' + this.$store.state.auth.userId)
      .then((res) => {
        const data = res.data
        this.reservations.push(...data)
      }
    )
    .catch((error) => {
      console.log(error)
      this.reservations = "ERROR"
    })
  },
  methods: {
    cancelReservation() {
    }
  }
}
</script>