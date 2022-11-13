<template>
  <section class="p-10 mt-10" aria-label="Main page content">
    <h1 class="mb-10 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Product Details</h1>

    <div class="flex">
      <img class="w-100 h-100" src="https://picsum.photos/500" alt="">
      <div class="ml-5">
        <h2 class="mb-3 text-4xl font-bold tracking-normal leading-normal text-gray-900 lg:text-5xl dark:text-white">Watson & Watson Fresh Organic Irish Carrot</h2>
        <p class="mb-5 text-4xl font-bold text-primary-regular">£200</p>
        <!-- <p class="text-xl">Sold By: <a href="#" class="font-bold">Some Random Dude</a></p> -->
        <p class="mb-2 text-xl">Best Before: <strong>November 11, 2022</strong></p>
        <p class="text-gray-500">
          Origin: Lorem Ipsum Dolor Sit Amet
          <br>
          Description: It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'.
        </p>
        <div class="mt-5 mb-2 text-lg text-primary-dark">
          <p>Buy & get</p>
          <div class="text-2xl">
            <font-awesome-icon icon="fa-solid fa-coin" /><span class="ml-2">69</span>
          </div>
        </div>
        <button type="button" class="mt-4 text-primary-regular hover:text-white border border-primary-regular border-2 hover:bg-primary-regular focus:ring-4 focus:outline-none focus:primary-dark font-medium rounded-full text-lg px-5 py-2.5 text-center transition-all ease-in-out">Purchase</button>
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
