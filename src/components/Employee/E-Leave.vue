<template>
  <div class="bg-gray-100">
    <e-header />
    <div class="min-h-screen flex flex-col">
      <div class="flex flex-1">
        <div class="flex flex-col justify-center items-center">
          <e-sidebar />
        </div>

        <div class="flex flex-1 flex-col items-center overflow-hidden">
          <div class="lg:w-[90rem] md:w-[40rem]  sm:w-[25rem] bg-white rounded-2xl px-6 py-5 mt-16 shadow-2xl">
            <div class="flex items-center justify-between mb-5 p-5">
              <h1 class="text-3xl font-light text-gray-800"><span v-html="$t('title') + '<br>' + $t('title2')"></span></h1>
              <div class="flex items-center">
                <Popover v-slot="{ open }" class="relative">
                  <PopoverButton class="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl mr-3 flex">
                    <svg width="20" height="27" viewBox="0 0 14 21" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-1">
                      <path d="M2.26097 3.90137H11.4925C11.5758 3.90137 11.6573 3.93796 11.727 4.00669C11.7968 4.07542 11.8519 4.17334 11.8856 4.28854C11.9193 4.40374 11.9301 4.53126 11.9168 4.6556C11.9035 4.77995 11.8666 4.89576 11.8105 4.98897L8.27791 10.8678C8.20599 10.9875 8.16614 11.1434 8.16614 11.3052V15.9075C8.16614 16.0146 8.14867 16.12 8.11528 16.2144C8.0819 16.3087 8.03362 16.3892 7.97475 16.4486L6.25557 18.1825C6.19084 18.2478 6.11561 18.2852 6.03791 18.2909C5.96021 18.2966 5.88294 18.2703 5.81435 18.2147C5.74577 18.1592 5.68843 18.0766 5.64845 17.9756C5.60847 17.8746 5.58736 17.7592 5.58736 17.6415V11.3052C5.58736 11.1434 5.54751 10.9875 5.47559 10.8678L1.94295 4.98897C1.88694 4.89576 1.85003 4.77995 1.83671 4.6556C1.82339 4.53126 1.83423 4.40374 1.86792 4.28854C1.9016 4.17334 1.95668 4.07542 2.02646 4.00669C2.09624 3.93796 2.17771 3.90137 2.26097 3.90137V3.90137Z" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p class="font-light">{{ $t('employeesOverview.filter') }}</p>
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
                          <input type="radio" id="allowed" value="Allowed" v-model="selectedFilter" class="mr-2">
                          <label for="allowed" class="font-light">{{ $t('allowed') }}</label>
                        </div>
                        <div class="p-3">
                          <input type="radio" id="refused" value="Refused" v-model="selectedFilter" class="mr-2">
                          <label for="refused" class="font-light">{{ $t('refused') }}</label>
                        </div>
                      </div>
                      <div class="flex">
                        <div class="p-3">
                          <input type="radio" id="pending" value="Pending" v-model="selectedFilter" class="mr-2">
                          <label for="pending" class="font-light">{{ $t('pending') }}</label>
                        </div>
                        <div class="p-3">
                          <input type="radio" id="all_status" value="allstatus" v-model="selectedFilter" class="mr-2">
                          <label for="all_status" class="font-light">{{ $t('allStatus') }}</label>
                        </div>
                      </div>
                    </PopoverPanel>
                  </transition>
                </Popover>
                <button  @click="openRequest"
                         class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl mr-3 flex">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 9.75V4.875C12 4.37772 12.1975 3.90081 12.5492 3.54917C12.9008 3.19754 13.3777 3 13.875 3C14.3723 3 14.8492 3.19754 15.2008 3.54917C15.5525 3.90081 15.75 4.37772 15.75 4.875V12.375" stroke="#D8D8D8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8.25 10.5V3.375C8.25 2.87772 8.44754 2.40081 8.79917 2.04917C9.15081 1.69754 9.62772 1.5 10.125 1.5C10.6223 1.5 11.0992 1.69754 11.4508 2.04917C11.8025 2.40081 12 2.87772 12 3.375V9.75" stroke="#D8D8D8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 16.125C12 15.1304 12.3951 14.1766 13.0983 13.4733C13.8016 12.7701 14.7554 12.375 15.75 12.375V10.5C15.75 10.0027 15.9475 9.52581 16.2992 9.17417C16.6508 8.82254 17.1277 8.625 17.625 8.625C18.1223 8.625 18.5992 8.82254 18.9508 9.17417C19.3025 9.52581 19.5 10.0027 19.5 10.5V14.25C19.5 16.2391 18.7098 18.1468 17.3033 19.5533C15.8968 20.9598 13.9891 21.75 12 21.75C10.0109 21.75 8.10322 20.9598 6.6967 19.5533C5.29018 18.1468 4.5 16.2391 4.5 14.25V6.375C4.5 5.87772 4.69754 5.40081 5.04917 5.04917C5.40081 4.69754 5.87772 4.5 6.375 4.5C6.87228 4.5 7.34919 4.69754 7.70083 5.04917C8.05246 5.40081 8.25 5.87772 8.25 6.375V10.5" stroke="#D8D8D8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <p class="font-light">{{ $t('ask') }}</p>
                </button>
              </div>
            </div>
            <div class="overflow-x-auto rounded-xl">
              <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-sm text-gray-700 uppercase dark:bg-gray-300 dark:text-gray-600">
                <tr>
                  <th scope="col" class="px-10 py-3">{{ $t('type') }}</th>
                  <th scope="col" class="px-10 py-3">{{ $t('startDate') }}</th>
                  <th scope="col" class="px-10 py-3"></th>
                  <th scope="col" class="px-10 py-3">{{ $t('endDate') }}</th>
                  <th scope="col" class="px-10 py-3">{{ $t('explanation') }}</th>
                  <th scope="col" class="px-16 py-3">{{ $t('paid') }}</th>
                  <th scope="col" class="py-3">{{ $t('status') }}</th>
                  <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr class="border-b-gray-100 border-b-2 hover:bg-blue-50 cursor-pointer" v-for="leave in pageLeave" :key="leave.id">
                  <td class="px-10 py-3">{{ leave.type }}</td>
                  <td class="px-10 py-3">{{ leave.start_date }}</td>
                  <td class="font-light text-gray-400 text-xl">-------</td>
                  <td class="px-10 py-3">{{ leave.end_date }}</td>
                  <td class="px-10 py-3">{{ leave.reason }}</td>
                  <td :class="paidColor(leave)" class="px-16 py-3">{{ leave.Paid }}</td>
                  <td :class="statusColor(leave)" class="px-10 py-3 ">{{ leave.status }}</td>
                  <td>
                    <div class="flex">
                      <div class="transform transition-transform duration-200 ease-in-out hover:scale-105 hover:z-10" @click="editRequest(leave.id)">
                        <svg v-if="leave.status === 'Pending'"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 15H9V12L18 3L21 6L12 15Z" stroke="#FF0101" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" v-if="leave.status === 'Pending'"/>
                          <path d="M15.75 5.25L18.75 8.25" stroke="#FF0101" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" v-if="leave.status === 'Pending'"/>
                          <path d="M20.25 11.25V19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V4.5C3.75 4.30109 3.82902 4.11032 3.96967 3.96967C4.11032 3.82902 4.30109 3.75 4.5 3.75H12.75" stroke="#FF0101" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" v-if="leave.status === 'Pending'"/>
                        </svg>
                      </div>
                    <div class="ml-2.5 transform transition-transform duration-200 ease-in-out hover:scale-105 hover:z-10" @click="delRequest(leave.id)">
                      <svg v-if="leave.status === 'Pending'"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.25 5.25L3.75 5.25001" stroke="#FF0101" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" v-if="leave.status === 'Pending'"/>
                        <path d="M9.75 9.75V15.75" stroke="#FF0101" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" v-if="leave.status === 'Pending'"/>
                        <path d="M14.25 9.75V15.75" stroke="#FF0101" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" v-if="leave.status === 'Pending'"/>
                        <path d="M18.75 5.25V19.5C18.75 19.6989 18.671 19.8897 18.5303 20.0303C18.3897 20.171 18.1989 20.25 18 20.25H6C5.80109 20.25 5.61032 20.171 5.46967 20.0303C5.32902 19.8897 5.25 19.6989 5.25 19.5V5.25" stroke="#FF0101" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" v-if="leave.status === 'Pending'"/>
                        <path d="M15.75 5.25V3.75C15.75 3.35218 15.592 2.97064 15.3107 2.68934C15.0294 2.40804 14.6478 2.25 14.25 2.25H9.75C9.35218 2.25 8.97064 2.40804 8.68934 2.68934C8.40804 2.97064 8.25 3.35218 8.25 3.75V5.25" stroke="#FF0101" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" v-if="leave.status === 'Pending'"/>
                      </svg>
                    </div>
                    </div>
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

        <!--   Request a leave -->
        <transition name="fade">
          <div v-if="isRequest" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="w-full px-4">
              <div class="mx-auto w-full max-w-xl rounded-2xl bg-white p-8">
                <div class="flex justify-between pb-6">
                  <h3 class="text-2xl bold font-bold text-blue-900 "><strong>{{ $t('ask') }}</strong></h3>
                  <div class="bg-blue-100 rounded-lg h-8 p-1 hover:bg-blue-300" @click="closeRequest">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.75 5.25L5.25 18.75" stroke="#252C58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M18.75 18.75L5.25 5.25" stroke="#252C58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
                <form @submit.prevent="">
                  <div class="flex">
                    <div class="mb-4 mr-24">
                      <label for="user_nom" class="block text-gray-700">{{ $t('startDate') }}<span class="text-red-600">*</span></label>
                      <input
                          v-model="start_date"
                          type="date"
                          id="start_date"
                          class="mt-2 p-2 w-full text-gray-600 pl-5 border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom"
                      />
                    </div>
                    <div class="mb-4">
                      <label for="user_telephone" class="block text-gray-700">{{ $t('endDate') }}<span class="text-red-600">*</span></label>
                      <input
                          v-model="end_date"
                          type="date"
                          id="end_date"
                          class="mt-2 p-2 w-full pl-5 text-gray-600 border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom"
                      />
                    </div>
                  </div>
                  <div class="mt-4 mb-4">
                    <label for="reason" class="block text-gray-700 mb-2">{{ $t('explanation') }}<span class="text-red-600">*</span></label>
                    <textarea
                        id="reason"
                        v-model="reason"
                        class="mt-2 w-full p-2 text-sm border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom text-gray-900"
                        rows="4"
                        :style="{ minHeight: '50px', maxHeight: '200px', overflowY: 'auto' }"
                    ></textarea>
                  </div>
                  <div class="mb-4 mt-4">
                    <label for="type" class="block text-gray-700 mb-2">{{ $t('type') }}<span class="text-red-600">*</span></label>
                    <select
                        id="type"
                        v-model="type"
                        class="mt-2 w-full p-2 bg-white text-gray-600 border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom"
                    >
                      <option value="annual">{{ $t('annual') }}</option>
                      <option value="sick">{{ $t('sick') }}</option>
                      <option value="family">{{ $t('mat_pat') }}</option>
                      <option value="other">{{ $t('other') }}</option>
                    </select>
                  </div>
                </form>
                <p v-if="error" class="text-red-500 text-xs font-bold text-center mb-2">{{ error }}</p>
                <div class="mt-5 border-t-gray-100 border-t-2 mb-5"></div>
                <button @click="saveEditRequest" class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-950 hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                  {{ $t('save') }}
                </button>
                <button @click="closeEditRequest" class="ml-5 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                  {{ $t('employeesOverview.cancel') }}
                </button>
              </div>
            </div>
          </div>
        </transition>

        <!--   Edit a leave request -->
        <transition name="fade">
          <div v-if="isEditRequest" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="w-full px-4">
              <div class="mx-auto w-full max-w-xl rounded-2xl bg-white p-8">
                <div class="flex justify-between pb-6">
                  <h3 class="text-xl bold font-bold text-blue-900"
                  >{{ $t('leaveRequested') }}</h3>
                  <div class="bg-blue-100 rounded-lg h-8 p-1 hover:bg-blue-300" @click="closeEditRequest">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.75 5.25L5.25 18.75" stroke="#252C58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M18.75 18.75L5.25 5.25" stroke="#252C58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
                <form @submit.prevent="">
                  <div class="flex">
                    <div class="mb-4 mr-24">
                      <label for="user_nom" class="block text-gray-700">{{ $t('startDate') }}<span class="text-red-600">*</span></label>
                      <input
                          v-model="start_date"
                          type="date"
                          id="start_date"
                          class="mt-2 p-2 w-full text-gray-600 pl-5 border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom"
                      />
                    </div>
                    <div class="mb-4">
                      <label for="user_telephone" class="block text-gray-700">{{ $t('endDate') }}<span class="text-red-600">*</span></label>
                      <input
                          v-model="end_date"
                          type="date"
                          id="end_date"
                          class="mt-2 p-2 w-full pl-5 text-gray-600 border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom"
                      />
                    </div>
                  </div>
                  <div class="mt-4 mb-4">
                    <label for="reason" class="block text-gray-700 mb-2">{{ $t('explanation') }}<span class="text-red-600">*</span></label>
                    <textarea
                        id="reason"
                        v-model="reason"
                        class="mt-2 w-full p-2 text-sm border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom text-gray-900"
                        rows="4"
                        :style="{ minHeight: '50px', maxHeight: '200px', overflowY: 'auto' }"
                    ></textarea>
                  </div>
                  <div class="mb-4 mt-4">
                    <label for="type" class="block text-gray-700 mb-2">{{ $t('type') }}<span class="text-red-600">*</span></label>
                    <select
                        id="type"
                        v-model="type"
                        class="mt-2 w-full p-2 bg-white text-gray-600 border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom"
                    >
                      <option value="annual">{{ $t('annual') }}</option>
                      <option value="sick">{{ $t('sick') }}</option>
                      <option value="family">{{ $t('mat_pat') }}</option>
                      <option value="other">{{ $t('other') }}</option>
                    </select>
                  </div>
                </form>
                <p v-if="error" class="text-red-500 text-xs font-bold text-center mb-2">{{ error }}</p>
                <div class="mt-5 border-t-gray-100 border-t-2 mb-5"></div>
                <button @click="saveEditRequest" class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-950 hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                  Save
                </button>
                <button @click="closeEditRequest" class="ml-5 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                  Cancel
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
import ESidebar from "@/components/Employee/E-Sidebar.vue";
import EHeader from "@/components/Employee/E-Header.vue";

const recherche = ref('');
const currentPage = ref(0);
const error = ref('');
const start_date = ref('');
const end_date = ref('');
const reason = ref('');
const type = ref('');
const author = localStorage.getItem('userName')
const Paid = ref('No');
const status = ref('Pending');
const currentleave = ref('');

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
  return filtered;
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
const selectedFilter = ref('allstatus');
const applyFilters = (leaves) => {
  if (selectedFilter.value === 'allstatus') {
    return leaves;
  }
  return leaves.filter((leave) => leave.status === selectedFilter.value);
};

// Request a leave
const isRequest = ref(false);
const closeRequest = () => {
  isRequest.value = false;
  error.value = '';
};
const openRequest = () => {
  isRequest.value = true;
  start_date.value = '';
  end_date.value = '';
  reason.value = '';
  type.value = '';
  error.value = '';
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
    author: author,
    Paid: Paid.value,
    status: status.value,
  }
  if (!start_date.value
      || !end_date.value
      || !reason.value
      || !type.value) {
    error.value = 'Entrez les informations !';
    return;
  }
  leave.value.push(newRequest);
  closeRequest()
}

// Edit Leave Request
const isEditRequest = ref(false);
const closeEditRequest = () => {
  isEditRequest.value = false;
  error.value = '';
};
const openEditRequest = () => {
  isEditRequest.value = true;
  start_date.value = '';
  end_date.value = '';
  reason.value = '';
  type.value = '';
  error.value = '';
};

// Edit Leave request
const editRequest = (leaveId: number) => {
  openEditRequest();
  const leaveIndex = leave.value.findIndex(leave => leave.id === leaveId);
  if (leaveIndex !== -1) {
    currentleave.value = leave.value[leaveIndex];
    start_date.value = currentleave.value.start_date;
    end_date.value = currentleave.value.end_date;
    reason.value = currentleave.value.reason;
    type.value = currentleave.value.type;
    status.value = currentleave.value.status;
  }
}

const saveEditRequest = () => {
  if (currentleave.value) {
    currentleave.value.start_date = start_date.value;
    currentleave.value.end_date = end_date.value;
    currentleave.value.reason = reason.value;
    currentleave.value.type = type.value;
    currentleave.value.status = status.value;

    closeEditRequest();
    recherche.value = ('');
    error.value = ('');
    start_date.value = ('');
    end_date.value = ('');
    reason.value = ('');
    type.value = ('');
  }
}
// Delete Leave request
const delRequest = (leaveId: number) => {
  const leaveIndex = leave.value.findIndex(leave => leave.id === leaveId);
  if (leaveIndex !== -1) {
    leave.value.splice(leaveIndex, 1);
  }
}
</script>

