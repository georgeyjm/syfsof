<template>
  <section class="p-10 mt-10" aria-label="Main page content">
    <h1 class="mb-10 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Fridge</h1>

    <div class="flex flex-wrap lg:flex-nowrap gap-5">
      <div v-for="food in allFood">
        <p>Your {{ food.Name }} is expiring in {{ food.DaysToExpire }} days</p>
      </div>
      <div>
        <router-link to="/scan">Scan Item to Add</router-link>
      </div>
    </div>
  </section>
</template>


<script>
  const baseURL = 'https://api.syfsof.org'
  // const baseURL = 'https://localhost:5000'

  export default {
    name: 'CustomerFridgePage',
    components: {
    },
    data() {
      return {
        allFood: []
      }
    },
    async created() {
      const req = await fetch(`${baseURL}/get-allfood`, )
      this.allFood = await req.json()
      this.allFood.sort((f1, f2) => f1.DaysToExpire - f2.DaysToExpire)
    }
  }
</script>


<style scoped>
</style>
