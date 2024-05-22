<template>
  <div class="bg-blue-900 h-full p-4 text-white">
    <div class="flex flex-col items-center">
      <div class="text-4xl font-bold mb-6">ClockBox</div>
      <nav class="flex flex-col space-y-4">
        <a href="#" class="flex items-center p-2 rounded hover:bg-blue-800">
          <i class="fas fa-home"></i> <span class="ml-2">Dashboard</span>
        </a>
        <a href="#" class="flex items-center p-2 rounded hover:bg-blue-800">
          <i class="fas fa-users"></i> <span class="ml-2">Employees</span>
        </a>
        <a href="#" class="flex items-center p-2 rounded hover:bg-blue-800">
          <i class="fas fa-calendar-alt"></i> <span class="ml-2">Planning</span>
        </a>
        <a href="#" class="flex items-center p-2 rounded hover:bg-blue-800">
          <i class="fas fa-cogs"></i> <span class="ml-2">Parameters</span>
        </a>
      </nav>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
i {
  font-size: 1.5rem;
}
</style>
