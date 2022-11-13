<template>
  <a href="/" class="w-36 my-5">
    <img v-if="inverted" src="@/assets/images/logo-light.svg" class="w-40" alt="SYFSOF Logo" />
    <img v-else src="@/assets/images/logo-dark.svg" class="w-40" alt="SYFSOF Logo" />
  </a>
</template>


<script>
  export default {
    name: 'Logo',
    props: {
      inverted: {
        type: Boolean,
        default: false,
      },
    }
  }
</script>
