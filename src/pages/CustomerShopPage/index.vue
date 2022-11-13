<template>
  <section class="p-10 mt-10" style="min-width: 0" aria-label="Main page content">
    <h1 class="mb-10 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Shop</h1>

    <form>
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
      <div class="relative">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input @input="searchFood" type="search" class="block p-4 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <!-- <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> -->
      </div>
    </form>

    <div v-if="query !== ''">
      <div class="flex flex-wrap">
        <ShopPageItemCard :title="food.foodInfo.name" :food="food" v-for="food in recommendedFood" />
      </div>
    </div>

    <div class="mb-8">
      <h2 class="mb-4 text-2xl font-bold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white">From Your Favorite Suppliers</h2>
      <div class="hide-scroll flex overflow-x-scroll">
        <ShopPageItemCard title="Tesco" />
        <ShopPageItemCard title="Sainsbury" />
        <ShopPageItemCard title="Marks & Spencer" />
        <ShopPageItemCard title="Waitrose" />
        <ShopPageItemCard title="George's Superb Long Very Long Shop" />
      </div>
    </div>

    <div class="mb-8">
      <h2 class="mb-4 text-2xl font-bold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Shop Again</h2>
      <div class="hide-scroll flex overflow-x-scroll">
        <ShopPageItemCard title="Bread" />
        <ShopPageItemCard title="Eggs" />
        <ShopPageItemCard title="Maple Syrup" />
        <ShopPageItemCard title="Bacon" />
        <ShopPageItemCard title="Thomas's Incredibly Long and Unnecessary But Delicious Soup" />
      </div>
    </div>

  </section>
</template>


<script>
  import { recommendFood } from '@/tokens.js'
  import ShopPageItemCard from '@/pages/CustomerShopPage/ShopPageItemCard.vue'

  const sellers = [
    '0xfeB23A728C560e7D186523eC2C90298f1eE1Ea1a',
    '0xdCaF5C965bE2282528CD35bF8D36495Bd9609236'
  ]

  export default {
    name: 'CustomerShopPage',
    components: {
      ShopPageItemCard
    },
    methods: {
      async searchFood(event) {
        this.query = event.target.value
        this.recommendedFood = await recommendFood(this.query.split(' '), sellers)
      }
    },
    data() {
      return {
        query: '',
        recommendedFood: [],
      }
    }
  }
</script>


<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scroll::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hide-scroll {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
