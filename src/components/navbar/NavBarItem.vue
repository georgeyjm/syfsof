<template>
  <li>
    <router-link :to="dest" class="flex items-center px-4 py-3 text-lg font-extrabold text-white rounded-lg hover:bg-primary-regular">
      <font-awesome-icon :icon="icon" class="fa-fw text-xl" />
      <span class="flex-1 ml-4 whitespace-nowrap">{{ text }}</span>
    </router-link>
  </li>
</template>


<script>
 export default {
  name: 'NavBarItem',
  props: {
    text: {
      type: String,
      required: true,
    },
    dest: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  }
 }
</script>


<style scoped>
  .router-link-active {
    background-color: theme('colors.primary.regular');
  }
</style>
