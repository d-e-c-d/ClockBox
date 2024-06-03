<template>
  <div
      class="flex flex-col items-center bg-white p-4 sm:p-6 justify-end rounded-3xl shadow-2xl w-full h-auto md:w-80 md:h-80 mb-6 md:mb-10 transform transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-3xl hover:z-10"
  >
    <img
        v-if="img"
        :src="img"
        alt="Card Image"
        class="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 object-cover mb-4 sm:mb-6 lg:mb-10"
    />
    <p
        class="w-full sm:w-60 h-10 sm:h-12 px-2 sm:px-4 py-2 bg-blue-700 text-lg sm:text-xl text-white rounded-2xl hover:bg-blue-900 cursor-pointer text-center"
    >
      {{ title }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  img: String,
});

</script>

<style scoped>
</style>
