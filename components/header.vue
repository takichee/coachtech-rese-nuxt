<template>
  <div>
    <header class="z-10 text-gray-700 body-font border-b border-gray-200 fixed top-0 bg-white w-full">
      
      <!-- Header Top -->
      <div class="hidden flex justify-end pt-2 px-6 text-blue-700">
        <div class="hover:underline"><p>会員登録</p></div>
        <span class="px-2">/</span>
        <div class="hover:underline"><p>ログイン</p></div>
      </div>
      <div class="flex justify-end pt-2 px-6 text-blue-700">
        <div class="hover:underline"><nuxt-link to="/mypage">
          <font-awesome-icon icon="user" class="text-sm"/>
          マイページ
        </nuxt-link></div>
      </div>

      <!-- Header bottom -->
      <div class="container mx-auto flex flex-wrap justify-between py-2 px-5 flex-col md:flex-row items-center">
        <nuxt-link to="/" class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <div class="header-icon bg-yellow-400 rounded-lg px-2 py-1">
            <font-awesome-icon icon="utensils" class="text-xl text-white" />
          </div>
          <span class="ml-3 text-xl">Rese</span>
        </nuxt-link>

        <!-- Search Bar -->
        <form class="flex items-centers justify-center">
          <div class="font-sans text-black bg-white flex items-center justify-center">
            <div class="border rounded overflow-hidden flex">
              <input type="text" class="w-1/4 px-4 py-1 border-r-2" placeholder="エリア">
              <input type="text" class="w-1/4 px-4 py-1 border-r-2" placeholder="ジャンル">
              <input type="text" class="w-1/2 px-4 py-1" placeholder="店名">
              <button class="flex items-center justify-center px-4 border-l bg-yellow-400">
                <font-awesome-icon icon="search" class="text-xl text-white" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </header>
  </div>
</template>