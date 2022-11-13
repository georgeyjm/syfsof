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
        <label for="unitQuantity" class="block mb-2 font-medium text-gray-900 dark:text-gray-300">Unit Weight (grams)</label>
        <input type="number" v-model="unitQuantity" id="unitQuantity" class="block w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      </div>
      <div class="mb-6">
        <label for="price" class="block mb-2 font-medium text-gray-900 dark:text-gray-300">Price (£)</label>
        <input type="number" v-model="price" id="price" class="block w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
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
      <button id="submit-btn" type="submit" class="mt-2 text-primary-regular enabled:hover:text-white border border-primary-regular border-2 enabled:hover:bg-primary-regular focus:ring-4 focus:outline-none focus:primary-dark font-medium rounded-full text-lg px-5 py-2.5 text-center transition-all ease-in-out">Submit</button>
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
      async addItem(e) {
        e.preventDefault()

        const prodName = this.prodName
        const tags = this.keywords.split(' ')
        const weight = BigInt(this.weight)
        const bestBefore = Math.floor(this.bestBefore / 1000)
        const origin = this.origin
        const description = this.description
        const price = this.price
        const unitQuantity = this.unitQuantity

        console.log('adding item:', prodName, tags, { origin, description, price, unitQuantity }, weight, bestBefore)

        const btnEl = document.getElementById('submit-btn')
        btnEl.setAttribute('disabled', '');
        btnEl.innerHTML = `<svg aria-hidden="true" role="status" class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#88b04b"/>
          </svg> Loading`;
        await addFood(prodName, tags, { origin, description, price, unitQuantity }, weight, bestBefore)
        window.location.reload()
      }
    },
    data() {
      return {
        prodName: '',
        keywords: '',
        weight: '',
        bestBefore: Date.now(),
        origin: '',
        description: '',
        price: '',
        unitQuantity: ''
      }
    }
  }
</script>


<style scoped>
</style>
