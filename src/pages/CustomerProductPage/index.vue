<template>
  <section class="p-10 mt-10" aria-label="Main page content">
    <h1 class="mb-10 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Product Details</h1>

    <div class="flex flex-wrap lg:flex-nowrap gap-5">
      <img class="w-100 h-100 object-cover" src="https://picsum.photos/seed/{{ prodName }}/600/600" alt="">
      <div class="">
        <h2 class="mb-3 text-4xl font-bold tracking-normal  text-gray-900 lg:text-5xl dark:text-white">{{ prodName }}</h2>
        <p class="mb-5 text-4xl font-bold text-primary-regular">£{{ price }}</p>
        <!-- <p class="text-xl">Sold By: <a href="#" class="font-bold">Some Random Dude</a></p> -->
        <p class="mb-2 text-xl">Best Before: <strong>{{ new Date(bestBefore * 1000).toLocaleDateString(undefined, {dateStyle: 'long'}) }} </strong></p>
        <p class="text-gray-500">
          Origin: {{ origin }}
          <br>
          Description: {{ description }}
        </p>
        <div v-if="tokensEarned" class="mt-5 mb-2 text-lg text-primary-dark">
          <p>Buy & get</p>
          <div class="text-2xl">
            <font-awesome-icon icon="fa-solid fa-coin" /><span class="ml-2">{{ tokensEarned }}</span>
          </div>
        </div>
        <button id="submit-btn" type="button" @click="buy" class="mt-4 text-primary-regular enabled:hover:text-white border border-primary-regular border-2 enabled:hover:bg-primary-regular focus:ring-4 focus:outline-none focus:primary-dark font-medium rounded-full text-lg px-5 py-2.5 text-center transition-all ease-in-out">Purchase</button>
      </div>
    </div>
  </section>
</template>


<script>
  import ShopPageItemCard from '@/pages/CustomerShopPage/ShopPageItemCard.vue'
  import { getFood, calculateSavedWeight, recordPurchase } from '@/tokens.js'

  export default {
    name: 'CustomerShopPage',
    components: {
      ShopPageItemCard
    },
    data() {
      return {
        prodName: '',
        price: undefined,
        bestBefore: undefined,
        origin: '',
        description: '',
        tokensEarned: 0,
        unitQuantity: 0,
        foodId: 0
      }
    },
    async created() {
      const { seller, batch } = this.$route.query
      const food = await getFood(seller, batch)
      this.prodName = food.foodInfo.name
      if (!food.foodInfo.info)
        food.foodInfo.info = {}
      this.price = food.foodInfo.info.price || this.price
      this.bestBefore = Number.parseInt(food.bestBefore)
      this.origin = food.foodInfo.info.origin || this.origin
      this.description = food.foodInfo.info.description || this.description
      this.foodId = food.foodId
      
      this.unitQuantity = food.foodInfo.info.unitQuantity || this.unitQuantity
      this.tokensEarned = await calculateSavedWeight(seller, batch, this.unitQuantity)
      console.log(this.tokensEarned)
    },
    methods: {
      async buy() {
        const btnEl = document.getElementById('submit-btn')
        btnEl.setAttribute('disabled', '');
        btnEl.innerHTML = `<svg aria-hidden="true" role="status" class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#88b04b"/>
          </svg> Loading`;
        await recordPurchase(this.foodId, this.unitQuantity)
        window.location.reload()
      }
    }
  }
</script>


<style scoped>
</style>
