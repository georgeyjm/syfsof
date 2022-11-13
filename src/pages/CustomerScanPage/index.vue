<template>
  <section class="p-10 mt-10" aria-label="Main page content">
    <h1 class="mb-10 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Scan QR Code</h1>

    <form @submit="addFood">
      <input name="name" type="text">
      <input name="bestBefore" type="date">
      <!-- YYYY-MM-DD -->
      <input name="productionDate" type="date">
      <input name="expirationDate" type="date" value="2022-11-13">
      <input name="originalFrom" type="text">
      <input name="storage_Condition" type="text">
      <input name="product_Description" type="text">
      <input name="index" type="text">
      <input name="additionals" type="text">
      <button type="submit">Add Food</button>
    </form>
  </section>
</template>


<script>
  // const baseURL = 'http://localhost:5000'
  const baseURL = 'https://api.syfsof.org'

  export default {
    name: 'CustomerScanPage',
    components: {
    },
    methods: {
      addFood(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        fetch(`${baseURL}/addfood`, {
          method: 'POST',
          body: formData
        })
      }
    }
  }
</script>


<style scoped>
</style>
