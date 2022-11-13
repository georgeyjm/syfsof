<template>
  <section class="p-10 mt-10" aria-label="Main page content">
    <h1 class="mb-10 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Sell A Product</h1>
    
    <form @submit="addItem">
      <div class="mb-6">
        <label for="prodName" class="block mb-2 font-medium text-gray-900 dark:text-gray-300">Name of the Product</label>
        <input v-model="prodName" type="text" id="prodName" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      </div>
      <div class="mb-6">
        <label for="keywords" class="block mb-2 font-medium text-gray-900 dark:text-gray-300">Keywords (separate by spaces)</label>
        <textarea v-model="keywords" id="keywords" rows="4" class="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
      </div>
      <div class="mb-6">
        <label for="weight" class="block mb-2 font-medium text-gray-900 dark:text-gray-300">Total Weight (grams)</label>
        <input type="number" v-model="weight" id="weight" class="block w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        <!-- <div class="absolute inset-y-0 right-0 flex items-center">
          <span style="margin-left:10px;">lb</span>
        </div> -->
      </div>
      <div class="mb-6">
        <label for="bestBefore" class="block mb-2 font-medium text-gray-900 dark:text-gray-300">Best Before</label>
        <input type="date" :valueAsNumber="bestBefore" @input="event => bestBefore = event.target.valueAsNumber" id="bestBefore" class="block w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      </div>
      <div class="mb-6">
        <label for="origin" class="block mb-2 font-medium text-gray-900 dark:text-gray-300">Origin</label>
        <input type="text" v-model="origin" id="origin" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>
      <div class="mb-6">
        <label for="description" class="block mb-2 font-medium text-gray-900 dark:text-gray-300">Description</label>
        <textarea v-model="description" id="description" rows="4" class="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
      </div>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>

  </section>
</template>


<script>
  import { addFood } from '@/tokens.js'

  export default {
    name: 'SellerAddBatchPage',
    components: {
    },
    methods: {
      async addItem() {
        const prodName = this.prodName
        const tags = this.keywords.split(' ')
        const weight = BigInt(this.weight)
        const bestBefore = Math.floor(this.bestBefore / 1000)
        const origin = this.origin
        const description = this.description

        console.log('adding item:', prodName, tags, { origin, description }, weight, bestBefore)
        await addFood(prodName, tags, { origin, description }, weight, bestBefore)
      }
    },
    data() {
      return {
        prodName: '',
        keywords: '',
        weight: '',
        bestBefore: Date.now(),
        origin: '',
        description: ''
      }
    }
  }
</script>


<style scoped>
</style>
