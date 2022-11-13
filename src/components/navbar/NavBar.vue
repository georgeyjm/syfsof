<template>
  <section class="w-64 lg:w-96 h-screen shrink-0 sticky top-0" aria-label="Sidebar">
    <div class="h-full overflow-y-auto py-4 px-4 bg-primary-dark">

      <Logo inverted />
      <NavBarProfile />

      <ul class="space-y-1">
        <NavBarItem text="Home" dest="/" icon="fa-duotone fa-home" />
        <NavBarItem text="Shop" dest="/shop" icon="fa-duotone fa-cart-shopping" />
        <NavBarItem text="Fridge" dest="/fridge" icon="fa-duotone fa-fork-knife" />
        <NavBarItem text="Scan" dest="/scan" icon="fa-duotone fa-scanner-gun" />
        <NavBarItem text="Trees" dest="/trees" icon="fa-duotone fa-trees" />
        <NavBarItem text="Settings" dest="/settings" icon="fa-duotone fa-sliders" />
      </ul>
   </div>
  </section>
</template>


<script>
  import Logo from '@/components/common/Logo.vue'
  import NavBarItem from '@/components/navbar/NavBarItem.vue'
  import NavBarProfile from '@/components/navbar/NavBarProfile.vue'

  export default {
    name: 'NavBar',
    components: {
      Logo,
      NavBarItem,
      NavBarProfile,
    },
  }
</script>


<style scoped>
</style>
