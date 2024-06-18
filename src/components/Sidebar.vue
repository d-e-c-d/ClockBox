<template>
  <div class="max-w-40 mx-auto mr-36 relative flex flex-col justify-center items-center">
    <div class="bg-white rounded-3xl shadow-2xl p-6 fixed top-64 left-12">
      <header class="flex items-center justify-center mb-6">
        <button class="flex w-10 h-10 items-center justify-center bg-blue-600 rounded-3xl hover:bg-blue-900">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
          >
            <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 5a1 1 0 1 1 0-2h12a1 1 0 1 1 0 2H4zm0 4a1 1 0 1 1 0-2h12a1 1 0 1 1 0 2H4z"
            />
          </svg>
        </button>
      </header>
      <nav class="flex flex-col text-center">

        <div>
          <div class="absolute left-0" v-if="isActive('/dashboard')">
            <svg width="10" height="30" viewBox="0 0 10 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0H5C7.76142 0 10 2.23858 10 5V25C10 27.7614 7.76142 30 5 30H0V0Z" fill="#0842A0"/>
            </svg>
          </div>
          <router-link to="/dashboard" class="flex items-center justify-center w-28 px-4 py-2 bg-blue-700 text-white rounded-2xl shadow mb-8 hover:bg-blue-900 transform transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-3xl hover:z-10" :class="{ 'bg-blue-800': isActive('/dashboard') }">
            <span>Dashboard</span>
          </router-link>
        </div>

        <div>
          <div class="absolute left-0" v-if="isActive('/pointing')">
            <svg width="10" height="30" viewBox="0 0 10 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0H5C7.76142 0 10 2.23858 10 5V25C10 27.7614 7.76142 30 5 30H0V0Z" fill="#0842A0"/>
            </svg>
          </div>
          <router-link to="/pointing" class="flex items-center justify-center w-28 px-4 py-2 bg-blue-700 text-white rounded-2xl shadow mb-8 hover:bg-blue-900 transform transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-3xl hover:z-10" :class="{ 'bg-blue-800': isActive('/pointing') }">
            <span>Pointing</span>
          </router-link>
        </div>

        <div>
          <div class="absolute left-0" v-if="isActive('/employees')">
            <svg width="10" height="30" viewBox="0 0 10 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0H5C7.76142 0 10 2.23858 10 5V25C10 27.7614 7.76142 30 5 30H0V0Z" fill="#0842A0"/>
            </svg>
          </div>
          <router-link to="/employees" class="flex items-center justify-center w-28 px-4 py-2 bg-blue-700 text-white rounded-2xl shadow mb-8 hover:bg-blue-900 transform transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-3xl hover:z-10" :class="{ 'bg-blue-800': isActive('/employees') }">
            <span>Employees</span>
          </router-link>
        </div>

        <div>
          <div class="absolute left-0" v-if="isActive('/planning')">
            <svg width="10" height="30" viewBox="0 0 10 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0H5C7.76142 0 10 2.23858 10 5V25C10 27.7614 7.76142 30 5 30H0V0Z" fill="#0842A0"/>
            </svg>
          </div>
          <router-link to="/planning" class="flex items-center justify-center w-28 px-4 py-2 bg-blue-700 text-white rounded-2xl shadow mb-8 hover:bg-blue-900 transform transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-3xl hover:z-10" :class="{ 'bg-blue-800': isActive('/planning') }">
            <span>Planning</span>
          </router-link>
        </div>

        <div>
          <div class="absolute left-0" v-if="isActive('/leave')">
            <svg width="10" height="30" viewBox="0 0 10 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0H5C7.76142 0 10 2.23858 10 5V25C10 27.7614 7.76142 30 5 30H0V0Z" fill="#0842A0"/>
            </svg>
          </div>
          <router-link to="/leave" class="flex items-center justify-center w-28 px-4 py-2 bg-blue-700 text-white rounded-2xl shadow mb-8 hover:bg-blue-900 transform transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-3xl hover:z-10" :class="{ 'bg-blue-800': isActive('/planning') }">
            <span>Leave</span>
          </router-link>
        </div>

          <div>
            <div class="absolute left-0" v-if="isActive('/settings')">
              <svg width="10" height="30" viewBox="0 0 10 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H5C7.76142 0 10 2.23858 10 5V25C10 27.7614 7.76142 30 5 30H0V0Z" fill="#0842A0"/>
              </svg>
            </div>
            <router-link to="/settings" class="flex items-center justify-center w-28 px-4 py-2 bg-blue-700 text-white rounded-2xl shadow mb-5 hover:bg-blue-900 transform transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-3xl hover:z-10" :class="{ 'bg-blue-800': isActive('/settings') }">
              <span>Settings</span>
            </router-link>
          </div>

      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

function isActive(path: string) {
  return route.path === path;
}
</script>