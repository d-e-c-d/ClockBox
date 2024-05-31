<template>
  <div class="bg-gray-100 p-3 pt-24">
      <header class="fixed top-0 left-24 right-0 z-50 max-w-screen-2xl mx-auto flex items-center justify-between bg-white p-4 shadow-2xl rounded-3xl">
        <div class="flex items-center">
          <div class="text-4xl font-bold text-blue-700">ClockBox</div>
        </div>
        <div class="relative flex-1 max-w-md mx-auto">
          <input
              type="text"
              placeholder="Quick Search..."
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
                  src="@/components/icons/Profil.svg"
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
                    <a
                        @click.prevent="handleItemClick(item)"
                        v-for="item in profil"
                        :key="item.name"
                        :href="item.href"
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
                    </a>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
          <div>
            <span class="block text-gray-700">User</span>
            <span class="block text-gray-400 text-sm">charles.dikoume@2027.ucac-icam.com</span>
          </div>
        </div>
      </header>
    </div>

  <!-- LogOut -->
  <transition name="fade">
    <div v-if="isLogout" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h3 class="text-2xl bold font-bold text-blue-900"><span>LogOut</span></h3>
        <p class="mt-2 text-sm text-gray-500">Do you want to disconnect ?</p>
        <router-link to="/index" class="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
          Exit
        </router-link>
        <button @click="closeLogout" class="mt-4 ml-5 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
          Cancel
        </button>
      </div>
    </div>
  </transition>
</template>


<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import {ref} from "vue";
import Header from "@/components/Header.vue";

const isLogout = ref(false);

const closeLogout = () => {
  isLogout.value = false;
};
const openLogout = () => {
  isLogout.value = true;
};

const profil = [
  {
    name: 'Settings',
    description: 'Acess to your settings.',
    href: '/settings',
    icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '<path d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z" stroke="#1E3A8A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        '<path d="M17.2181 6.10177C17.4583 6.31443 17.6854 6.54148 17.898 6.78166L20.4595 7.14743C20.8749 7.87075 21.1951 8.64467 21.4123 9.45001L19.8604 11.5192C19.8604 11.5192 19.8799 12.1604 19.8604 12.4806L21.413 14.5505C21.1953 15.3557 20.8745 16.1294 20.4586 16.8524L17.898 17.2182C17.898 17.2182 17.4584 17.6854 17.2183 17.898L16.8525 20.4595C16.1292 20.8749 15.3552 21.1951 14.5499 21.4123L12.4808 19.8604C12.1606 19.8799 11.8395 19.8799 11.5193 19.8604L9.44944 21.413C8.64425 21.1953 7.87054 20.8745 7.1475 20.4586L6.7818 17.8981C6.54162 17.6855 6.31457 17.4584 6.10191 17.2183L3.54044 16.8525C3.12505 16.1292 2.80479 15.3552 2.58759 14.5499L4.13957 12.4807C4.13957 12.4807 4.12005 11.8395 4.13951 11.5193L2.58691 9.44944C2.80466 8.64425 3.12545 7.87054 3.54132 7.1475L6.10177 6.7818C6.31443 6.54161 6.54148 6.31457 6.78166 6.10191L7.14743 3.54044C7.87075 3.12505 8.64467 2.80479 9.45001 2.58759L11.5191 4.13951C11.8393 4.12005 12.1604 4.12005 12.4806 4.13951L14.5505 2.58691C15.3557 2.80466 16.1294 3.12545 16.8524 3.54132L17.2181 6.10177Z" stroke="#1E3A8A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        '</svg>\n' +
        '\n',
  },
  {
    name: 'Leave requests',
    description: 'Manage the employee leave requests list.',
    href: '##',
    icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '<path d="M3 19.5V6C3 5.80109 3.07902 5.61032 3.21967 5.46967C3.36032 5.32902 3.55109 5.25 3.75 5.25H8.75C8.91228 5.25 9.07018 5.30263 9.2 5.4L11.8 7.35C11.9298 7.44737 12.0877 7.5 12.25 7.5H18.75C18.9489 7.5 19.1397 7.57902 19.2803 7.71967C19.421 7.86032 19.5 8.05109 19.5 8.25V10.5" stroke="#1E3A8A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        '<path d="M3 19.5L5.82906 11.0128C5.87884 10.8635 5.97434 10.7336 6.10204 10.6416C6.22974 10.5495 6.38316 10.5 6.54057 10.5H21.4594C21.5783 10.5 21.6954 10.5282 21.8012 10.5824C21.907 10.6365 21.9984 10.7151 22.0679 10.8115C22.1373 10.9079 22.1829 11.0194 22.2009 11.1369C22.2188 11.2544 22.2085 11.3744 22.1709 11.4872L19.5 19.5H3Z" stroke="#1E3A8A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        '</svg>\n' +
        '\n',
  },
  {
    name: 'Logout',
    description: 'Logout to leave us.',
    href: '##',
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
