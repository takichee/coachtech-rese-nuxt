<template>
  <div>
    <SearchHeader />
    <div class="mt-24"></div>
    <div class="flex">
    <AskLogin />
    <MypageNav />
    <div class="ml-72"></div>
    <div class="min-h-screen"></div>
    <Nuxt />
    </div>
    <ReseFooter />
  </div>
</template>

<script>
export default {
  name: 'mypage',
  middleware: 'auth'
}
</script>