<template>
  <div v-show="isOpen" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500" aria-hidden="true"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="flex-col">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
              <nuxt-link to="/">
                <div class="mx-auto  header-icon bg-yellow-400 rounded-lg px-2 py-1 w-9 text-center">
                  <font-awesome-icon icon="utensils" class="text-xl text-white" />
                </div>
              </nuxt-link>
              <h3 class="my-4 text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Oops😫
              </h3>
              <div class="mt-2">
                <p class="text-sm text-red-500">
                  ログインに失敗しました。再度ログインしてください。
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex px-4 py-3 sm:px-6 justify-center">
          <nuxt-link to="/auth/login" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            ログイン
          </nuxt-link>
        </div>
        <div class="flex justify-center pb-6">
          <nuxt-link to="/auth/register"
            class="text-gray-500 text-sm underline">
            新規登録
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
    data () {
      return {
        isOpen: false
      }
    },
    created() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.isOpen = false
        } else {
          this.isOpen = true
        }
      })
    }
}
</script>