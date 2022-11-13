<template>
  <section class="w-64 lg:w-96 h-screen shrink-0" aria-label="Sidebar">
    <div id="" class="h-full overflow-y-auto py-4 px-4 bg-gray-50 dark:bg-gray-800">

      <NavBarProfile />

      <ul class="space-y-3">
        <NavBarItem text="Home" icon="fa-duotone fa-home" />
        <NavBarItem text="Shop" icon="fa-duotone fa-cart-shopping" />
        <NavBarItem text="Scan" icon="fa-duotone fa-scanner-gun" />
        <NavBarItem text="Settings" icon="fa-duotone fa-sliders" />
      </ul>
   </div>
  </section>
</template>


<script>
  import NavBarItem from '@/components/navbar/NavBarItem.vue'
  import NavBarProfile from '@/components/navbar/NavBarProfile.vue'

  export default {
    name: 'NavBar',
    components: {
      NavBarItem,
      NavBarProfile,
    },
  }
</script>


<style scoped>
  section > div {
    background-color: #476930;
  }
</style>
