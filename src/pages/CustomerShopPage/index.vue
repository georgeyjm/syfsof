<template>
  <section class="p-10 mt-10" aria-label="Main page content">
    <h1 class="mb-10 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Shop</h1>

    <div class="">
      <h2 class="mb-4 text-2xl font-bold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Shop from your favorite suppliers</h2>
      <div class="flex">
        <ShopPageItemCard title="Tesco" />
        <ShopPageItemCard title="Sainsbury" />
        <ShopPageItemCard title="Marks & Spencer" />
        <ShopPageItemCard title="Waitrose" />
        <ShopPageItemCard title="George's Superb Long Very Long Shop" />
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
