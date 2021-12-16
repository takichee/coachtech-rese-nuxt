<template>
  <div>
    <div class="min-h-screen bg-white flex">
      <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:w-1/2 lg:px-20 xl:px-24">
        <div class="mx-auto w-full max-w-sm">
          <div>
            <h2 class="mt-6 text-3xl leading-9 font-extrabold text-gray-900 text-center">
              Join Rese!
            </h2>
          </div>

          <div class="mt-8">

            <div class="mt-6">
              <form @submit.prevent="register">
                <div>
                  <label for="name" class="block text-sm font-medium leading-5 text-gray-700">
                    ユーザー名
                  </label>
                  <div class="mt-1 rounded-md shadow-sm">
                    <input v-model="user.name" id="name" type="text" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                  </div>
                </div>

                <div class="mt-6">
                  <label for="email" class="block text-sm font-medium leading-5 text-gray-700">
                    メールアドレス
                  </label>
                  <div class="mt-1 rounded-md shadow-sm">
                    <input v-model="user.email" id="email" type="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                  </div>
                </div>

                <div class="mt-6">
                  <label for="password" class="block text-sm font-medium leading-5 text-gray-700">
                    パスワード
                  </label>
                  <div class="mt-1 rounded-md shadow-sm">
                    <input v-model="user.password" id="password" type="password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                  </div>
                </div>

                <div class="mt-6 flex items-center justify-between">
                  <div class="flex items-center">
                    <input id="remember_me" type="checkbox" class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                    <label for="remember_me" class="ml-2 block text-sm leading-5 text-gray-900">
                      ログイン情報を保存する
                    </label>
                  </div>

                  <div class="text-sm leading-5">
                    <nuxt-link to="/auth/login" class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                      ログイン
                    </nuxt-link>
                  </div>
                </div>

                <div class="mt-6">
                  <span class="block w-full rounded-md shadow-sm">
                    <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                      新規会員登録
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="hidden lg:block relative w-0 flex-1">
        <img class="absolute inset-0 h-full w-full object-fill" src="https://picsum.photos/200" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'auth',
  data () {
    return {
      user: {
        name: null,
        email: null,
        password: null,
      },
    }
  },
  computed: {
    ...mapGetters({
      uid: 'auth/getUserUid'
    })
  },
  methods: {
    async register() {
      try {
        await this.$store.dispatch('auth/register',
          {
            email: this.user.email,
            password: this.user.password
          }
        )
        await this.$axios.post('http://localhost:8000/api/v1/users',
            {
              name: this.user.name,
              email: this.user.email,
              uid: this.$store.state.auth.userUid
            }
          )
        const data = await this.$axios.get(`http://localhost:8000/api/v1/users/${this.$store.state.auth.userUid}`)
        this.userInfo = data.data
        /*await this.$store.dispatch('user/setUserInfo', userInfo)*/
        this.$router.push('/thanks')
      } catch (error) {
        console.log(error)
        this.$router.push('/auth/register')
      }
    }
  }
}
</script>
