<template>
  <div class="w-64 mx-4 mb-5 flex-shrink-0 rounded-lg overflow-hidden bg-white shadow-lg cursor-pointer transition-all ease-in-out duration-200 hover:shadow-md hover:scale-95">
    <img class="w-64" src="https://picsum.photos/200">
    <div class="px-6 py-4">
      <div class="font-bold text-lg">{{ title }}</div>
      <!-- <p class="text-gray-700 text-base">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
      </p> -->
    </div>
  </div>
</template>


<script>
  export default {
    name: 'ShopPageItemCard',
    props: {
      title: {
        type: String,
        default: '',
      },
    }
  }
</script>
