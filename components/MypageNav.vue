<template>
  <div>
    <div class="flex">
      <nav class="bg-white h-72 text-gray-500 pr-12 flex flex-col fixed border-r-2">
        <div class="nav-list">
          <ul>
            <li>
              <nuxt-link to="/mypage" class="text-gray-800 flex items-center my-6 py-2 px-3 hover:text-yellow-400">
                山田太郎さんのマイページ
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/mypage/reservations" class="group flex items-center py-2 px-3 border-l-4 border-transparent hover:bg-yellow-400 hover:text-white focus:border-yellow-400 focus:text-gray-800" href="#">
                <font-awesome-icon icon="history" class="text-xl mr-4 focus:bg-transparent" />
                予約履歴
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/mypage/likes" class="group flex items-center py-2 px-3 border-l-4 border-transparent hover:bg-yellow-400 hover:text-white focus:border-yellow-400  focus:text-gray-800" href="#">
                <font-awesome-icon icon="heart" class="text-xl mr-4" />
                お気に入り一覧
              </nuxt-link>
            </li>
          </ul>
        </div>

        <div class="nav-bottom">
        <ul class="mt-8">
          <li>
          <a class="group flex items-center py-2 px-3 border-l-4 border-transparent hover:bg-yellow-400 hover:text-white focus:border-yellow-400" href="#">
            <font-awesome-icon icon="sign-out-alt" class="text-xl mr-4" />
            ログアウト
          </a>
          </li>
        </ul>
        </div>
      </nav>
    </div>
  </div>
</template>