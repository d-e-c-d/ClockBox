<template>
  <div class="bg-white p-4 w-72 h-48 rounded-2xl shadow-2xl">

    <div class="flex items-center justify-between ml-5">
      <p class="text-4xl font-sans mt-5">{{ value }}</p>
      <img
          v-if="img"
          :src="img"
          alt="statcard img"
          class="hover:bg-gray-100 rounded-full">
    </div>

    <p
        class="text-gray-700 text-xl mt-8 ml-5">
      {{ title }}</p>

    <div class="flex items-center mt-1 text-xs text-gray-500 ml-5">
      <div
          v-if="svgCode"
          v-html="svgCode"
          class="mr-2"/>

      <p>{{ change }}</p>
    </div>

  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  value: String,
  change: String,
  img: String,
  svgCode: String,
});
</script>