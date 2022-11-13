<template>
  <li>
    <a href="#" class="flex items-center p-2 text-lg font-extrabold text-gray-50 rounded-lg hover:bg-gray-500">
      <font-awesome-icon :icon="icon" class="text-xl" />
      <span class="flex-1 ml-4 whitespace-nowrap">{{ text }}</span>
    </a>
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
    icon: {
      type: String,
      required: true,
    },
  }
 }
</script>
