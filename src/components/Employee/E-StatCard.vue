<template>
  <div class="bg-white p-4 w-72 h-48 rounded-2xl shadow-2xl flex items-center space-x-4">
    <div class="relative">
      <svg class="w-24 h-24">
        <circle class="text-gray-300" stroke-width="15" stroke="currentColor" fill="transparent" r="36" cx="50%" cy="50%" />
        <circle
            class="text-blue-600"
            stroke-width="15"
            stroke-dasharray="226.2"
            :stroke-dashoffset="offset"
            stroke-linecap="round"
            stroke="currentColor"
            fill="#EAE8E8"
            r="36"
            cx="50%"
            cy="50%"
        />
      </svg>
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="text-2xl text-blue-700 font-bold">{{ total }}</span>
      </div>
    </div>

    <div class="flex flex-col">
      <p class="text-xl text-blue-700 items-center pb-5 font-bold text-center">{{ title }}</p>
<!--      <div class="flex items-center mb-1">-->
<!--        <svg class="w-4 h-4 text-gray-700 mr-1">-->
<!--          <circle cx="2" cy="2" r="2" fill="currentColor" />-->
<!--        </svg>-->
<!--        <span class="text-xs text-gray-700">Remaining -{{ remaining }}</span>-->
<!--      </div>-->
<!--      <div class="flex items-center mb-1">-->
<!--        <svg class="w-4 h-4 text-blue-700 mr-1">-->
<!--          <circle cx="2" cy="2" r="2" fill="currentColor" />-->
<!--        </svg>-->
<!--        <span class="text-xs text-blue-700">Used -{{ used }}</span>-->
<!--      </div>-->
<!--      <div class="flex items-center">-->
<!--        <svg class="w-4 h-4 text-black mr-1">-->
<!--          <circle cx="2" cy="2" r="2" fill="currentColor" />-->
<!--        </svg>-->
      <!--        <span class="text-xs text-blue-700">Used -{{ total }}</span>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

// Props
const props = defineProps({
  title: String,
  remaining: Number,
  used: Number,
  total: Number
});

// Computed properties
// const percentage = computed(() => Math.round((props.remaining / props.total) * 100));
// const offset = computed(() => 226.2 * ((100 - percentage.value) / 100));
</script>
