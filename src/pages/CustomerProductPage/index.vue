<template>
  <section class="p-10 mt-10" aria-label="Main page content">
    <h1 class="mb-10 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Product Details</h1>

    <div class="flex">
      <img class="mr-6" src="https://picsum.photos/500" alt="">
      <div>
        <h2 class="mb-4 text-xl font-bold tracking-normal leading-normal text-gray-900 md:text-4xl lg:text-5xl dark:text-white">Watson & Watson Fresh Organic Irish Carrot</h2>
      </div>
    </div>
  </section>
</template>


<script>
  import ShopPageItemCard from '@/pages/CustomerShopPage/ShopPageItemCard.vue'

  export default {
    name: 'CustomerShopPage',
    components: {
      ShopPageItemCard
    },
  }
</script>


<style scoped>
</style>
