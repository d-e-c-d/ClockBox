<template>
  <div class="bg-gray-100">
    <Header />
    <div class="min-h-screen flex flex-col">
      <div class="flex flex-1">
        <div class="flex flex-col justify-center items-center">
          <Sidebar />
        </div>

        <div class="flex flex-1 flex-col items-center overflow-hidden">
          <div class="lg:w-[90rem] md:w-[40rem]  sm:w-[25rem] bg-white rounded-2xl px-6 py-5 mt-16 shadow-2xl">
            <div class="flex items-center justify-between mb-5 p-5">
              <h1 class="text-3xl font-light text-gray-800">Leave <br> Request</h1>
              <div class="flex items-center">
                <div class="relative flex-1 max-w-md mx-auto mr-4">
                  <input
                      v-model="recherche"
                      type="text"
                      placeholder="Quick Search..."
                      class="w-full p-2 pl-10 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 px-40"
                  />
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 absolute left-3 top-2.5 text-gray-500 rounded-xl hover:bg-gray-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      @click="searchleave(recherche)"
                  >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <Popover v-slot="{ open }" class="relative">
                  <PopoverButton class="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl mr-3 flex">
                    <svg width="20" height="27" viewBox="0 0 14 21" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-1">
                      <path d="M2.26097 3.90137H11.4925C11.5758 3.90137 11.6573 3.93796 11.727 4.00669C11.7968 4.07542 11.8519 4.17334 11.8856 4.28854C11.9193 4.40374 11.9301 4.53126 11.9168 4.6556C11.9035 4.77995 11.8666 4.89576 11.8105 4.98897L8.27791 10.8678C8.20599 10.9875 8.16614 11.1434 8.16614 11.3052V15.9075C8.16614 16.0146 8.14867 16.12 8.11528 16.2144C8.0819 16.3087 8.03362 16.3892 7.97475 16.4486L6.25557 18.1825C6.19084 18.2478 6.11561 18.2852 6.03791 18.2909C5.96021 18.2966 5.88294 18.2703 5.81435 18.2147C5.74577 18.1592 5.68843 18.0766 5.64845 17.9756C5.60847 17.8746 5.58736 17.7592 5.58736 17.6415V11.3052C5.58736 11.1434 5.54751 10.9875 5.47559 10.8678L1.94295 4.98897C1.88694 4.89576 1.85003 4.77995 1.83671 4.6556C1.82339 4.53126 1.83423 4.40374 1.86792 4.28854C1.9016 4.17334 1.95668 4.07542 2.02646 4.00669C2.09624 3.93796 2.17771 3.90137 2.26097 3.90137V3.90137Z" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p class="font-light">Filter</p>
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
                        class="absolute right-0 z-50 mt-3 w-[200%] max-w-sm transform px-4 sm:px-0 lg:max-w-sm bg-white shadow-lg rounded-xl p-5"
                    >
                      <div class="flex">
                        <div class="p-3">
                          <input type="checkbox" id="allowed" v-model="Allowed" class="mr-2" @click="filterCheckboxChange('Allowed')">
                          <label for="allowed" class="font-light">Allowed</label>
                        </div>
                        <div class="p-3">
                          <input type="checkbox" id="refused" v-model="Refused" class="mr-2" @click="filterCheckboxChange('Refused')">
                          <label for="refused" class="font-light">Refused</label>
                        </div>
                      </div>
                      <div class="flex">
                        <div class="p-3">
                          <input type="checkbox" id="pending" v-model="Pending" class="mr-2" @click="filterCheckboxChange('Pending')">
                          <label for="pending" class="font-light">Pending</label>
                        </div>
                        <div class="p-3">
                          <input type="checkbox" id="all_status" v-model="allstatus" class="mr-2" @click="filterCheckboxChange">
                          <label for="all_status" class="font-light">All</label>
                        </div>
                      </div>
                    </PopoverPanel>
                  </transition>
                </Popover>
              </div>
            </div>
            <div class="overflow-x-auto rounded-xl">
              <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-sm text-gray-700 uppercase dark:bg-gray-300 dark:text-gray-600">
                <tr>
                  <th scope="col" class="px-10 py-3">Employee</th>
                  <th scope="col" class="px-10 py-3">Type</th>
                  <th scope="col" class="px-10 py-3">Start-Date</th>
                  <th scope="col" class="px-10 py-3"></th>
                  <th scope="col" class="px-10 py-3">End-Date</th>
                  <th scope="col" class="px-10 py-3">Explanation</th>
                  <th scope="col" class="px-16 py-3">Paid</th>
                  <th scope="col" class=" py-3">Status</th>
                  <th scope="col" class="px-5 py-3"></th>
                </tr>
                </thead>
                <tbody>
                <tr class="border-b-gray-100 border-b-2 hover:bg-blue-50 cursor-pointer" v-for="leave in pageLeave" :key="leave.id">
                  <td class="px-5 py-3">{{ leave.author }}</td>
                  <td class="px-10 py-3">{{ leave.type }}</td>
                  <td class="px-10 py-3">{{ leave.start_date }}</td>
                  <td class="font-light text-gray-400 text-xl">-------</td>
                  <td class="px-10 py-3">{{ leave.end_date }}</td>
                  <td class="px-10 py-3">{{ leave.reason }}</td>
                  <td :class="paidColor(leave)" class="px-16 py-3">{{ leave.Paid }}</td>
                  <td :class="statusColor(leave)" class="px-10 py-3">{{ leave.status }}</td>
                  <td class="px-5 py-3">
                    <svg v-if="leave.status === 'Allowed'
                         || leave.status === 'Refused'"
                         width="24"
                         height="24"
                         viewBox="0 0 24 24"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg"
                         @click="viewRequestAnswer(leave.id)">
                      <path d="M12 5.24951C4.5 5.24951 1.5 12.0002 1.5 12.0002C1.5 12.0002 4.5 18.7495 12 18.7495C19.5 18.7495 22.5 12.0002 22.5 12.0002C22.5 12.0002 19.5 5.24951 12 5.24951Z" stroke="#2D622F" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" v-if="leave.status === 'Allowed'"/>
                      <path d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z" stroke="#2D622F" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" v-if="leave.status === 'Allowed'"/>
                      <path d="M12 5.24951C4.5 5.24951 1.5 12.0002 1.5 12.0002C1.5 12.0002 4.5 18.7495 12 18.7495C19.5 18.7495 22.5 12.0002 22.5 12.0002C22.5 12.0002 19.5 5.24951 12 5.24951Z" stroke="#FF0101" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" v-if="leave.status === 'Refused'"/>
                      <path d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z" stroke="#FF0101" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" v-if="leave.status === 'Refused'"/>
                    </svg>
                    <svg v-else-if="leave.status === 'Pending'"
                         width="24" height="24"
                         viewBox="0 0 24 24"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg"
                         @click="requestAnswer(leave.id)">
                      <path d="M11.9996 9.75V3.375C11.9996 2.87772 11.8021 2.40081 11.4504 2.04917C11.0988 1.69754 10.6219 1.5 10.1246 1.5C9.62734 1.5 9.15043 1.69754 8.7988 2.04917C8.44717 2.40081 8.24962 2.87772 8.24962 3.375V14.7437L6.19392 11.1831C6.07092 10.9697 5.90705 10.7825 5.7117 10.6324C5.51634 10.4823 5.29332 10.3722 5.05538 10.3083C4.81744 10.2445 4.56925 10.2281 4.32499 10.2602C4.08073 10.2923 3.84519 10.3723 3.63184 10.4955C3.41848 10.6186 3.23149 10.7827 3.08156 10.9781C2.93163 11.1736 2.82169 11.3967 2.75802 11.6347C2.69436 11.8727 2.67822 12.1209 2.71053 12.3652C2.74284 12.6094 2.82296 12.8449 2.94632 13.0581C5.99962 19.5 7.85749 21.75 11.9996 21.75C12.9845 21.75 13.9598 21.556 14.8697 21.1791C15.7797 20.8022 16.6065 20.2497 17.3029 19.5533C17.9994 18.8569 18.5518 18.0301 18.9287 17.1201C19.3056 16.2102 19.4996 15.2349 19.4996 14.25V10.5C19.4996 10.0027 19.3021 9.52581 18.9504 9.17417C18.5988 8.82254 18.1219 8.625 17.6246 8.625C17.1273 8.625 16.6504 8.82254 16.2988 9.17417C15.9472 9.52581 15.7496 10.0027 15.7496 10.5" stroke="#F96A02" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M15.75 10.5V9.375C15.75 8.87772 15.5525 8.40081 15.2008 8.04917C14.8492 7.69754 14.3723 7.5 13.875 7.5C13.3777 7.5 12.9008 7.69754 12.5492 8.04917C12.1975 8.40081 12 8.87772 12 9.375V9.75" stroke="#F96A02" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="flex justify-between mt-4">
              <p class="text-gray-500">Page {{ currentPage + 1 }} of {{ totalPages }}</p>
              <div class="flex items-center">
                <button
                    class="bg-gray-300 hover:bg-blue-900 text-white font-bold py-2 px-2 rounded mr-2"
                    :disabled="currentPage === 0"
                    @click="goToPage(currentPage - 1)">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 4C0 1.79086 1.79086 0 4 0H28C30.2091 0 32 1.79086 32 4V28C32 30.2091 30.2091 32 28 32H4C1.79086 32 0 30.2091 0 28V4Z" fill="none"/>
                    <path d="M17.75 20.375L13.375 16L17.75 11.625" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <button
                    class="bg-gray-300 hover:bg-blue-900 text-white font-bold py-2 px-2 rounded"
                    :disabled="currentPage === totalPages - 1"
                    @click="goToPage(currentPage + 1)">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 4C0 1.79086 1.79086 0 4 0H28C30.2091 0 32 1.79086 32 4V28C32 30.2091 30.2091 32 28 32H4C1.79086 32 0 30.2091 0 28V4Z" fill="none"/>
                    <path d="M14.25 11.625L18.625 16L14.25 20.375" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!--   View a request answer -->
        <transition name="fade">
          <div v-if="isVanswer" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="w-full px-4">
              <div class="mx-auto w-full max-w-xl rounded-2xl bg-white p-8">
                <div class="flex justify-between pb-6">
                  <h3 class="text-xl bold font-bold text-blue-900"
                     >
                    <strong>
                      {{ leave.author }} had requested a leave
                    </strong></h3>
                  <div class="bg-blue-100 rounded-lg h-8 p-1 hover:bg-blue-300" @click="closeVanswer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.75 5.25L5.25 18.75" stroke="#252C58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M18.75 18.75L5.25 5.25" stroke="#252C58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>

                <form @submit.prevent="">
                  <div class="flex">
                    <div class="mb-4 mr-24">
                      <label for="user_nom" class="block text-gray-700">Start-date</label>
                      <input
                          v-model="start_date"
                          type="date"
                          id="start_date"
                          class="mt-2 p-2 w-full text-gray-600 pl-5 border rounded-xl focus:outline-none"
                          readonly
                      />
                    </div>
                    <div class="mb-4">
                      <label for="user_telephone" class="block text-gray-700">End-date</label>
                      <input
                          v-model="end_date"
                          type="date"
                          id="end_date"
                          class="mt-2 p-2 w-full pl-5 text-gray-600 border rounded-xl focus:outline-none"
                          readonly
                      />
                    </div>
                  </div>
                  <div class="mt-4 mb-4">
                    <label for="reason" class="block text-gray-700 mb-2">Reason</label>
                    <textarea
                        id="reason"
                        v-model="reason"
                        class="mt-2 w-full p-2 text-sm border text-gray-600 rounded-xl focus:outline-none"
                        rows="4"
                        :style="{ minHeight: '50px', maxHeight: '200px', overflowY: 'auto' }"
                        readonly
                    ></textarea>
                  </div>
                  <div class="mb-4 mt-4">
                    <label for="type" class="block text-gray-700 mb-2">Type of leave</label>
                    <input
                        id="type"
                        v-model="type"
                        class="mt-2 w-full p-2 bg-white text-gray-600 border rounded-xl focus:outline-none"
                        readonly
                    />
                  </div>
                  <div class="flex">
                    <div class="mb-4 mt-4 mr-24">
                      <label for="user_nom" class="block text-gray-700">Paid</label>
                      <input
                          v-model="Paid"
                          type="text"
                          id="Paid"
                          class="mt-2 p-2 w-full text-gray-600 pl-5 border rounded-xl focus:outline-none"
                          readonly
                      />
                    </div>
                    <div class="mb-4 mt-4">
                      <label for="user_telephone" class="block text-gray-700">Status</label>
                      <input
                          v-model="status"
                          type="text"
                          id="status"
                          class="mt-2 p-2 w-full pl-5 text-gray-600 border rounded-xl focus:outline-none"
                          readonly
                      />
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </transition>

        <!--  Answer a request-->
        <transition name="fade">
          <div v-if="isAnswer" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="w-full px-4">
              <div class="mx-auto w-full max-w-xl rounded-2xl bg-white p-8">
                <div class="flex justify-between pb-6">
                  <h3 class="text-xl bold font-bold text-blue-900 "><strong>{{ leave.author }} is requesting a leave</strong></h3>
                  <div class="bg-blue-100 rounded-lg h-8 p-1 hover:bg-blue-300" @click="closeAnswer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.75 5.25L5.25 18.75" stroke="#252C58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M18.75 18.75L5.25 5.25" stroke="#252C58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>

                <form @submit.prevent="">
                  <div class="flex">
                    <div class="mb-4 mr-24">
                      <label for="user_nom" class="block text-gray-700">Start-date</label>
                      <input
                          v-model="start_date"
                          type="date"
                          id="start_date"
                          class="mt-2 p-2 w-full text-gray-600 pl-5 border rounded-xl focus:outline-none"
                          readonly
                      />
                    </div>
                    <div class="mb-4">
                      <label for="user_telephone" class="block text-gray-700">End-date</label>
                      <input
                          v-model="end_date"
                          type="date"
                          id="end_date"
                          class="mt-2 p-2 w-full pl-5 text-gray-600 border rounded-xl focus:outline-none"
                          readonly
                      />
                    </div>
                  </div>
                  <div class="mt-4 mb-4">
                    <label for="reason" class="block text-gray-700 mb-2">Reason</label>
                    <textarea
                        id="reason"
                        v-model="reason"
                        class="mt-2 w-full p-2 text-sm border text-gray-600 rounded-xl focus:outline-none"
                        rows="4"
                        :style="{ minHeight: '50px', maxHeight: '200px', overflowY: 'auto' }"
                        readonly
                    ></textarea>
                  </div>
                  <div class="flex">
                    <div class="mb-4 mt-4">
                      <label for="type" class="block text-gray-700 mb-2">Type of leave</label>
                      <input
                          id="type"
                          v-model="type"
                          class="mt-2 w-full p-2 bg-white text-gray-600 border rounded-xl focus:outline-none"
                          readonly
                      />
                    </div>
                    <div class="mb-4 mt-4">
                      <label for="type" class="block text-gray-700 mb-2">Pay leave</label>
                      <input
                          id="Paid"
                          v-model="Paid"
                          type="checkbox"
                          class="mt-2 w-full p-2 bg-white text-gray-600 border rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>
                </form>
                <p v-if="error" class="text-red-500 text-xs font-bold text-center mb-2">{{ error }}</p>
                <div class="mt-5 border-t-gray-100 border-t-2 mb-5"></div>
                <button @click="saverequestAnswer" class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                  Allow
                </button>
                <button @click="saverequestAnswer" class="ml-5 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                  Refuse
                </button>
              </div>
            </div>
          </div>
        </transition>

      </div>
    </div>
  </div>
</template>



<script setup lang="ts">

import {computed, ref} from "vue";
import {Popover, PopoverButton, PopoverPanel} from "@headlessui/vue";
import {useStorage} from "@vueuse/core";
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";

const recherche = ref('');
const currentPage = ref(0);
const allstatus = ref(true);
const Allowed = ref(false);
const Refused = ref(false);
const Pending = ref(false);
const error = ref('');
const start_date = ref('');
const end_date = ref('');
const reason = ref('');
const type = ref('');
const Paid = ref('');
const status = ref('');
const currentleave = ref('');
const author = ref('');

const leave = useStorage('leave', []);

// Search Leave
const searchleave = (query: String) => {
  return leave.value.filter( leave =>
      leave.type.toLowerCase().includes(recherche.value.toLowerCase())
      || leave.start_date.toLowerCase().includes(recherche.value.toLowerCase())
      || leave.end_date.toLowerCase().includes(recherche.value.toLowerCase())
      || leave.status.toLowerCase().includes(recherche.value.toLowerCase())
      || leave.paid.toLowerCase().includes(recherche.value.toLowerCase())
      || leave.reason.toLowerCase().includes(recherche.value.toLowerCase()));
};
const leaveFiltres = computed(() => {
  let filtered = leave.value;
  if (recherche.value) {
    filtered = searchleave(recherche.value);
  }
  filtered = applyFilters(filtered);
  return filtered.sort((a, b) => b.start_date - a.start_date);
});

const totalPages = computed(() => {
  return Math.ceil(leaveFiltres.value.length / 10);
});
let pageLeave = computed(() => {
  const start = currentPage.value * 10;
  return leaveFiltres.value.slice(start, start + 10);
});
const goToPage = (page:number) => {
  if (page >= 0 && page < totalPages.value) {
    currentPage.value = page;
  }
};

const statusColor = (leave) => {
  if (leave.status === "Allowed") {
    return ['bg-green-100 inline-block px-4 py-2 rounded-md text-green-600 mt-3 mb-3'];
  } else if (leave.status === "Refused") {
    return ['bg-red-100 inline-block px-4 py-2 rounded-md text-red-600 mt-3 mb-3'];
  } else {
    return ['bg-orange-100 inline-block px-4 py-2 rounded-md text-orange-600 mt-3 mb-3'];
  }
}
const paidColor = (leave) => {
  if (leave.Paid === "Yes") {
    return ['text-green-600'];
  } else if (leave.Paid === "No") {
    return ['text-red-600'];
  }
}

// Filter
const filterCheckboxChange = (selected: 'Allowed' | 'Refused' | 'Pending' | 'allstatus') => {
  if (selected === 'Allowed') {
    Refused.value = false;
    Pending.value = false;
    allstatus.value = false;
  } else if ( selected === 'Refused') {
    Allowed.value = false;
    Pending.value = false;
    allstatus.value = false;
  } else if ( selected === 'Pending') {
    Refused.value = false;
    Allowed.value = false;
    allstatus.value = false;
  } else {
    Refused.value = false;
    Allowed.value = false;
    Pending.value = false;
  }
};
const applyFilters = (leave) => {
  if (allstatus.value) {
    return leave;
  }
  return leave.filter(leave => {
    if (Allowed.value && leave.status === "Allowed") return true;
    if (Refused.value && leave.status === "Refused") return true;
    if (Pending.value && leave.status === "Pending") return true;
    return false;
  });
};

// Request a leave
const isAnswer = ref(false);
const closeAnswer = () => {
  isAnswer.value = false;
  error.value = '';
};
const openAnswer = () => {
  isAnswer.value = true;
};

// View a request
const isVanswer = ref(false);
const closeVanswer = () => {
  isVanswer.value = false;
  error.value = '';
};
const openVanswer = () => {
  isVanswer.value = true;
};

const addRequest = () => {
  let lastId = 0;
  if (leave.value && leave.value.length > 0) {
    lastId = leave.value[leave.value.length - 1].id;
  }

  const newRequest =  {
    id: lastId + 1,
    start_date: start_date.value,
    end_date: end_date.value,
    reason: reason.value,
    type: type.value,
  }

  leave.value.push(newRequest);

  if (
      !start_date.value
      || !end_date.value
      || !reason.value
      || !type.value) {
    error.value = 'Entrez les informations !';
    return
  }
  error.value = '';
  closeRequest();
  start_date.value = ('');
  end_date.value = ('');
  reason.value = ('');
  type.value = ('');
  error.value = ('');
}

// View request answer
const viewRequestAnswer = (leaveId: number) => {
  openVanswer();
  const leaveIndex = leave.value.findIndex(leave => leave.id === leaveId);
  if (leaveIndex !== -1) {
    currentleave.value = leave.value[leaveIndex];
    start_date.value = currentleave.value.start_date;
    end_date.value = currentleave.value.end_date;
    reason.value = currentleave.value.reason;
    type.value = currentleave.value.type;
    Paid.value = currentleave.value.Paid;
    status.value = currentleave.value.status;
  }
}

// Answer resquest

const requestAnswer = (leaveId: number) => {
  openAnswer();
  const leaveIndex = leave.value.findIndex(leave => leave.id === leaveId);
  if (leaveIndex !== -1) {
    currentleave.value = leave.value[leaveIndex];
    start_date.value = currentleave.value.start_date;
    end_date.value = currentleave.value.end_date;
    reason.value = currentleave.value.reason;
    type.value = currentleave.value.type;
    Paid.value = currentleave.value.Paid;
    status.value = currentleave.value.status;
  }
}

const saverequestAnswer = () => {
  if (currentleave.value) {
    currentleave.value = leave.value[leaveIndex];
    start_date.value = currentleave.value.start_date;
    end_date.value = currentleave.value.end_date;
    reason.value = currentleave.value.reason;
    type.value = currentleave.value.type;

    closeAnswer();
    recherche.value = ('');
    error.value = ('');
    start_date.value = ('');
    end_date.value = ('');
    reason.value = ('');
    type.value = ('');
  }
};
</script>

