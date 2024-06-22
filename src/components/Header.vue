<template>
  <div class="bg-gray-100 pt-24">
    <div>
      <header class="fixed top-0 left-24 right-0 z-50 max-w-screen-2xl mx-auto flex items-center justify-between bg-white p-4 shadow-2xl rounded-3xl">
        <div class="flex items-center">
          <div class="text-4xl font-bold text-blue-700">ClockBox</div>
        </div>
        <div class="relative flex-1 max-w-md mx-auto">
          <input
              type="text"
              :placeholder="$t('employeesOverview.quickSearchPlaceholder')"
              class="w-full p-2 pl-10 rounded-full border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 absolute left-3 top-2.5 text-gray-500 rounded-xl hover:bg-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
          <div class="flex items-center space-x-4">
            <router-link to="/planning">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-blue-500 rounded-2xl hover:bg-gray-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z"
              />
            </svg>
            </router-link>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-blue-500 rounded-3xl hover:bg-gray-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-9.33-5.037M9 17H4l1.405-1.405A2.032 2.032 0 006 14.158V11c0-.276.023-.545.068-.807"
            />
          </svg>
          <Popover v-slot="{ open }" class="relative">
            <PopoverButton
                :class="open ? 'text-white' : 'text-white/90'"
                class="group inline-flex items-center rounded-full bg-gray-100 hover:bg-gray-200 p-2 focus:outline-none"
            >
              <img
                  src="../components/icons/Profil.svg"
                  alt="Admin Profile"
                  class="w-10 h-10 rounded-full"
              />
            </PopoverButton>
            <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="translate-y-1 opacity-0"
                enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="translate-y-0 opacity-100"
                leave-to-class="translate-y-1 opacity-0"
            >
              <PopoverPanel
                  class="absolute right-0 z-50 mt-3 w-screen max-w-sm transform px-4 sm:px-0 lg:max-w-sm"
              >
                <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                  <div class="relative grid gap-8 bg-white p-7 lg:grid-cols-">
                    <router-link
                        @click.prevent="handleItemClick(item)"
                        v-for="item in profil"
                        :key="item.name"
                        :to="item.href"
                        class="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/50"
                    >
                      <div
                          class="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12"
                      >
                        <div v-html="item.icon"></div>
                      </div>
                      <div class="ml-4">
                        <p class="text-sm font-medium text-blue-900">
                          {{ item.name }}
                        </p>
                        <p class="text-sm text-gray-700">
                          {{ item.description }}
                        </p>
                      </div>
                    </router-link>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
          <div>
            <span class="block text-gray-700"><span class="font-light text-blue-700">Hi, </span>{{ user_name }}</span>
            <span class="block text-gray-400 text-sm">{{ user_email }}</span>
          </div>
        </div>
      </header>
    </div>
  </div>

  <!-- LogOut -->
  <transition name="fade">
    <div v-if="isLogout" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h3 class="text-2xl bold font-bold text-blue-900"><span>{{ $t('logout') }}</span></h3>
        <p class="mt-2 text-sm text-gray-500">{{ $t('logout_message') }}</p>
        <button @click="logout" class="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
          {{ $t('exit') }}
        </button>
        <button @click="closeLogout" class="mt-4 ml-5 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
          {{ $t('cancel') }}
        </button>
      </div>
    </div>
  </transition>
</template>


<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import {ref} from "vue";
import router from "@/router/index.ts";

const user_name = localStorage.getItem('adminName');
const user_email = localStorage.getItem('adminEmail');

const isLogout = ref(false);
const closeLogout = () => {
  isLogout.value = false;
};
const openLogout = () => {
  isLogout.value = true;
};
const isAuthenticated = ref(!!localStorage.getItem('userToken'));
const logout = () => {
  localStorage.removeItem('userToken');
  isAuthenticated.value = false;
  router.push('/login');
};

const profil = [
  {
    name: 'Logout',
    description: 'Logout to leave us.',
    href: '',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '  <path d="M14.25 7.5C15.4926 7.5 16.5 6.49264 16.5 5.25C16.5 4.00736 15.4926 3 14.25 3C13.0074 3 12 4.00736 12 5.25C12 6.49264 13.0074 7.5 14.25 7.5Z" stroke="#1E3A8A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        '  <path d="M5.25 9.52027C5.25 9.52027 8.25 6.74987 12.75 10.2703C17.4814 13.9717 20.25 12.5203 20.25 12.5203" stroke="#1E3A8A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        '  <path d="M12.6633 10.2031C12.2562 12.1161 9.5211 19.402 3 18.7499" stroke="#1E3A8A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        '  <path d="M10.373 15.1089C12.0441 15.4659 16.5001 16.8751 16.5001 21.7501" stroke="#1E3A8A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        '  <path d="M2.25 21H21.75" stroke="#1E3A8A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        '  <path d="M5.25 21V3.75C5.25 3.55109 5.32902 3.36032 5.46967 3.21967C5.61032 3.07902 5.80109 3 6 3H18C18.1989 3 18.3897 3.07902 18.5303 3.21967C18.671 3.36032 18.75 3.55109 18.75 3.75V21" stroke="#1E3A8A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        '  <path d="M14.625 12.9375C15.1428 12.9375 15.5625 12.5178 15.5625 12C15.5625 11.4822 15.1428 11.0625 14.625 11.0625C14.1072 11.0625 13.6875 11.4822 13.6875 12C13.6875 12.5178 14.1072 12.9375 14.625 12.9375Z" fill="black"/>\n' +
        '</svg>\n',
  },
]

const handleItemClick = (item) => {
  if (item.name === 'Logout') {
    openLogout();
  }
};
</script>
