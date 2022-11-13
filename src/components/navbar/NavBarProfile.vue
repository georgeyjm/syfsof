<template>
  <div class="mt-20 mb-10 flex flex-col items-center">
    <img class="mb-5 w-36 h-36 rounded-full outline outline-4 outline-primary-regular outline-offset-4 shadow-lg" src="https://i.pravatar.cc/300?u=syfsof" alt="Profile picture">
    <h2 class="mb-2 text-2xl font-extrabold tracking-tight leading-none text-white">Adam Smith</h2>
    <div class="text-gray-100 grid grid-cols-2 divide-x">
      <div class="px-3">
        <font-awesome-icon icon="fa-solid fa-tree" />
        <span class="ml-2">{{ userTreeCount }}</span>
      </div>
      <div class="px-3">
        <font-awesome-icon icon="fa-solid fa-coin" />
        <span class="ml-2">{{ userTokenCount }}</span>
      </div>
    </div>
  </div>
</template>


<script>
  import { numTrees, numTokens } from '@/tokens.js'

  export default {
    name: 'NavBarProfile',
    components: {
    },
    data() {
      return {
        userTreeCount: 0,
        userTokenCount: 0,
      }
    },
    async created() {
      this.userTreeCount = await numTrees()
      this.userTokenCount = await numTokens()
    },
  }
</script>


<style>
  
</style>
