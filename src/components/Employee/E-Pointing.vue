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
              <h1 class="text-3xl font-light text-gray-800">Attendance <br> Overview</h1>
              <div class="flex items-center">
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
                          <input type="checkbox" id="on_time" v-model="ontime" class="mr-2" @click="filterCheckboxChange('ontime')">
                          <label for="on_time" class="font-light">On time</label>
                        </div>
                        <div class="p-3">
                          <input type="checkbox" id="absent" v-model="absent" class="mr-2" @click="filterCheckboxChange('absent')">
                          <label for="Absent" class="font-light">Absent</label>
                        </div>
                      </div>
                      <div class="flex">
                        <div class="p-3">
                          <input type="checkbox" id="late_arrival" v-model="latearrival" class="mr-2" @click="filterCheckboxChange('latearrival')">
                          <label for="late_arrival" class="font-light">Late arrival</label>
                        </div>
                        <div class="p-3 -ml-4">
                          <input type="checkbox" id="all_status" v-model="allstatus" class="mr-2" @click="filterCheckboxChange">
                          <label for="all_status" class="font-light">All Status</label>
                        </div>
                      </div>
                    </PopoverPanel>
                  </transition>
                </Popover>
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
                      @click="searchpoint(recherche)"
                  >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <!-- Downoload csv file -->
                <Popover v-slot="{ open }" class="relative">
                  <PopoverButton class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl mr-3 flex">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 9.75V4.875C12 4.37772 12.1975 3.90081 12.5492 3.54917C12.9008 3.19754 13.3777 3 13.875 3C14.3723 3 14.8492 3.19754 15.2008 3.54917C15.5525 3.90081 15.75 4.37772 15.75 4.875V12.375" stroke="#D8D8D8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M8.25 10.5V3.375C8.25 2.87772 8.44754 2.40081 8.79917 2.04917C9.15081 1.69754 9.62772 1.5 10.125 1.5C10.6223 1.5 11.0992 1.69754 11.4508 2.04917C11.8025 2.40081 12 2.87772 12 3.375V9.75" stroke="#D8D8D8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 16.125C12 15.1304 12.3951 14.1766 13.0983 13.4733C13.8016 12.7701 14.7554 12.375 15.75 12.375V10.5C15.75 10.0027 15.9475 9.52581 16.2992 9.17417C16.6508 8.82254 17.1277 8.625 17.625 8.625C18.1223 8.625 18.5992 8.82254 18.9508 9.17417C19.3025 9.52581 19.5 10.0027 19.5 10.5V14.25C19.5 16.2391 18.7098 18.1468 17.3033 19.5533C15.8968 20.9598 13.9891 21.75 12 21.75C10.0109 21.75 8.10322 20.9598 6.6967 19.5533C5.29018 18.1468 4.5 16.2391 4.5 14.25V6.375C4.5 5.87772 4.69754 5.40081 5.04917 5.04917C5.40081 4.69754 5.87772 4.5 6.375 4.5C6.87228 4.5 7.34919 4.69754 7.70083 5.04917C8.05246 5.40081 8.25 5.87772 8.25 6.375V10.5" stroke="#D8D8D8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <p class="font-light">Request a leave</p>
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
                        class="absolute right-0 z-50 mt-3 w-full max-w-sm transform px-4 sm:px-0 lg:max-w-sm bg-white shadow-lg rounded-xl p-5"
                    >

                    </PopoverPanel>
                  </transition>
                </Popover>
              </div>
            </div>
            <div class="overflow-x-auto rounded-xl">
              <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-sm text-gray-700 uppercase dark:bg-gray-300 dark:text-gray-600">
                <tr>
                  <th scope="col" class="px-10 py-3">Date</th>
                  <th scope="col" class="px-10 py-3">Day</th>
                  <th scope="col" class="px-10 py-3">Check-in</th>
                  <th scope="col" class="px-10 py-3"></th>
                  <th scope="col" class="px-10 py-3">Check-out</th>
                  <th scope="col" class="px-8 py-3">Work hours</th>
                  <th scope="col" class=" py-3">Status</th>
                </tr>
                </thead>
                <tbody>
                <tr class="border-b-gray-100 border-b-2 hover:bg-blue-50 cursor-pointer" v-for="employee in pagePointing" :key="employee.id">
                  <td class="px-10 py-3">{{ employee.date }}</td>
                  <td class="px-10 py-3">{{ employee.day }}</td>
                  <td :class="checkinColor(employee)" class="px-10 py-3">{{ employee.checkIn }}</td>
                  <td class="font-light text-gray-400 text-xl">-------</td>
                  <td :class="checkoutColor(employee)" class="px-10 py-3">{{ employee.checkOut }}</td>
                  <td :class="workhoursColor(employee)" class="px-10 py-3">{{ employee.workHours }}</td>
                  <td :class="statusColor(employee)" class="px-10 py-3">{{ employee.status }}</td>
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
const error = ref('');
const thisPage = ref(false);
const allPages = ref(false);
const currentPage = ref(0);
const allstatus = ref(true);
const ontime = ref(false);
const latearrival = ref(false);
const absent = ref(false);

const epointing = useStorage('epointing', []);

// Search Employee
const searchpoint = (query: String) => {
  return epointing.value.filter( employee =>
      employee.date.toLowerCase().includes(recherche.value.toLowerCase())
      || employee.day.toLowerCase().includes(recherche.value.toLowerCase())
      || employee.status.toLowerCase().includes(recherche.value.toLowerCase())
      || employee.checkIn.toLowerCase().includes(recherche.value.toLowerCase())
      || employee.checkOut.toLowerCase().includes(recherche.value.toLowerCase()));
};
const pointingFiltres = computed(() => {
  let filtered = epointing.value;
  if (recherche.value) {
    filtered = searchpoint(recherche.value);
  }
  return applyFilters(filtered);
});

const totalPages = computed(() => {
  return Math.ceil(pointingFiltres.value.length / 10);
});
let pagePointing = computed(() => {
  const start = currentPage.value * 10;
  return pointingFiltres.value.slice(start, start + 10);
});
const goToPage = (page:number) => {
  if (page >= 0 && page < totalPages.value) {
    currentPage.value = page;
  }
};

const statusColor = (employee) => {
  if (employee.status === "On time") {
    return ['bg-blue-100 inline-block px-4 py-2 rounded-md text-blue-600 mt-3 mb-3'];
  } else if (employee.status === "Absent") {
    return ['bg-red-100 inline-block px-4 py-2 rounded-md text-red-600 mt-3 mb-3'];
  } else {
    return ['bg-yellow-100 inline-block px-4 py-2 rounded-md text-yellow-600 mt-3 mb-3'];
  }
}
const checkinColor = (employee) => {
  if (employee.checkIn === "00:00" && employee.checkOut === "00:00" && employee.workHours === "0m") {
    return ['text-red-600'];
  } else if (employee.checkIn === "9:15"
      || employee.checkIn === "9:30"
      || employee.checkIn === "9:45") {
    return ['text-yellow-600'];
  } else {
    return ['text-blue-700'];
  }
}
const checkoutColor = (employee) => {
  if (employee.checkOut === "00:00") {
    return ['text-red-600'];
  } else {
    return ['text-blue-700'];
  }
}
const workhoursColor = (employee) => {
  if (employee.workHours === "0m") {
    return ['text-red-600'];
  } else {
    return ['text-black'];
  }
}

// Filter
const filterCheckboxChange = (selected: 'ontime' | 'absent' | 'latearrival' | 'allstatus') => {
  if (selected === 'ontime') {
    allstatus.value = false;
    absent.value = false;
    latearrival.value = false;
  } else if ( selected === 'absent') {
    ontime.value = false;
    latearrival.value = false;
    allstatus.value = false;
  } else if ( selected === 'latearrival') {
    allstatus.value = false;
    absent.value = false;
    ontime.value = false;
  } else {
    ontime.value = false;
    latearrival.value = false;
    absent.value = false;
  }
};
const applyFilters = (epointing) => {
  if (allstatus.value) {
    return epointing;
  }
  return epointing.filter(employee => {
    if (ontime.value && employee.status === "On time") return true;
    if (latearrival.value && employee.status === "Late arrival") return true;
    if (absent.value && employee.status === "Absent") return true;
    return false;
  });
};
</script>

