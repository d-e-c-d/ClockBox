<template>
  <header class="flex items-center justify-between bg-white p-4 shadow-md">
    <div class="relative flex-1 max-w-xs">
      <input
          type="text"
          placeholder="Quick Search..."
          class="w-full p-2 pl-8 rounded border"
      />
      <i class="fas fa-search absolute left-2 top-2.5 text-gray-500"></i>
    </div>
    <div class="flex items-center space-x-4">
      <i class="fas fa-bell text-xl"></i>
      <i class="fas fa-envelope text-xl"></i>
      <div class="flex items-center space-x-2">
        <img
            src="https://via.placeholder.com/40"
            alt="Admin Profile"
            class="w-10 h-10 rounded-full"
        />
        <span>Admin</span>
      </div>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
i {
  font-size: 1.5rem;
}
</style>
