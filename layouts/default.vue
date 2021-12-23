<template>
  <div>
    <SearchHeader />
    <div class="mt-24"></div>
    <Nuxt />
    <ReseFooter />
  </div>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>