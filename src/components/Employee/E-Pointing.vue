<template>
  <div class="bg-gray-100">
    <Header />
    <div class="min-h-screen flex flex-col">
      <div class="flex flex-1">
        <div class="flex flex-col justify-center items-center">
          <Sidebar />
        </div>

      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import Sidebar from "@/components/Employee/E-Sidebar.vue";
import Header from "../Header.vue";


</script>
