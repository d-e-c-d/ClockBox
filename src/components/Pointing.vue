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
                    <h1 class="text-3xl font-light text-gray-800">Pointing <br> Overview</h1>
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
                      <button class="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-xl mr-3 flex" @click="openNewemp">
                        <svg width="20" height="20" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                          <path d="M12.5724 2.70602H2.84528C2.07783 2.70602 1.45569 3.3898 1.45569 4.23329V14.9241C1.45569 15.7676 2.07783 16.4514 2.84528 16.4514H12.5724C13.3399 16.4514 13.962 15.7676 13.962 14.9241V4.23329C13.962 3.3898 13.3399 2.70602 12.5724 2.70602Z" stroke="#9295AB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M10.488 1.17876V4.23328M4.92967 1.17876V4.23328M1.45569 7.28781H13.962" stroke="#9295AB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <p class="font-light">Calendar</p>
                      </button>
                      <!-- Downoload csv file -->
                      <Popover v-slot="{ open }" class="relative">
                        <PopoverButton class="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl mr-3 flex">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-1">
                            <path d="M12 2.99963V17.2496" stroke="#D8D8D8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5.25 10.4996L12 17.2496L18.75 10.4996" stroke="#D8D8D8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M3.75 20.2496H20.25" stroke="#D8D8D8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <p class="font-light">Export csv file</p>
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
                            <div class="p-3">
                              <input type="checkbox" id="this_page" v-model="thisPage" class="mr-2" @click="handleCheckboxChange('thisPage')">
                              <label for="this_page" class="font-light">This Page</label>
                            </div>
                            <div class="p-3">
                              <input type="checkbox" id="all_page" v-model="allPages" class="mr-2" @click="handleCheckboxChange('allPages')">
                              <label for="all_page" class="font-light">All Pages</label>
                            </div>
                            <p v-if="error" class="text-red-500 text-xs font-bold text-center mb-2">{{ error }}</p>
                            <div>
                              <button class="bg-blue-700 text-white font-bold py-1 px-10 rounded-xl ml-2 flex" @click="downloadCSV">
                                <p class="font-light">Download</p>
                              </button>
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
                        <th scope="col" class="px-6 py-3">ID</th>
                        <th scope="col" class="px-6 py-3">Employee</th>
                        <th scope="col" class="px-6 py-3">Role</th>
                        <th scope="col" class="px-6 py-3">Département</th>
                        <th scope="col" class="px-6 py-3">Date</th>
                        <th scope="col" class="px-6 py-3">Status</th>
                        <th scope="col" class="px-6 py-3">Check-in</th>
                        <th scope="col" class="px-6 py-3">Check-out</th>
                        <th scope="col" class="px-6 py-3">Work hours</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr class="border-b-gray-100 border-b-2 hover:bg-blue-50 cursor-pointer" v-for="employee in pagePointing" :key="employee.id">
                        <td class="text-gray-900 p-5">{{ employee.id }}</td>
                        <td class="text-gray-900">{{ employee.employee }}</td>
                        <td>{{ employee.role }}</td>
                        <td>{{ employee.department }}</td>
                        <td>{{ employee.date }}</td>
                        <td :class="statusColor(employee)">{{ employee.status }}</td>
                        <td :class="checkinColor(employee)">{{ employee.checkIn }}</td>
                        <td :class="checkoutColor(employee)">{{ employee.checkOut }}</td>
                        <td :class="workhoursColor(employee)">{{ employee.workHours }}</td>
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
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import {computed, onBeforeMount, ref} from "vue";
import {Popover, PopoverButton, PopoverPanel} from "@headlessui/vue";

const recherche = ref('');
const error = ref('');
const thisPage = ref(false);
const allPages = ref(false);
const currentPage = ref(0);
const allstatus = ref(true);
const ontime = ref(false);
const latearrival = ref(false);
const absent = ref(false);


const pointing = ref<Array>([
  {
    "id": 2341421,
    "employee": "Ahmed Rashdan",
    "role": "Help Desk Executive",
    "department": "IT",
    "date": "29 July 2023",
    "status": "On time",
    "checkIn": "09:00",
    "checkOut": "18:00",
    "workHours": "10h 2m"
  },
  {
    "id": 2341424,
    "employee": "Kadi Manela",
    "role": "System coordinator",
    "department": "IT Department",
    "date": "31 July 2023",
    "status": "Absent",
    "checkIn": "00:00",
    "checkOut": "00:00",
    "workHours": "0m"
  },
  {
    "id": 2341422,
    "employee": "John Doe",
    "role": "Software Engineer",
    "department": "Development",
    "date": "01 August 2023",
    "status": "On time",
    "checkIn": "8:30",
    "checkOut": "17:30",
    "workHours": "9h 30m"
  },
  {
    "id": 2341423,
    "employee": "Jane Smith",
    "role": "Marketing Manager",
    "department": "Marketing",
    "date": "02 August 2023",
    "status": "Late arrival",
    "checkIn": "9:30",
    "checkOut": "18:30",
    "workHours": "9h 30m"
  },
  {
    "id": 2341470,
    "employee": "Emily Chen",
    "role": "Data Analyst",
    "department": "Finance",
    "date": "03 August 2023",
    "status": "On time",
    "checkIn": "8:00",
    "checkOut": "17:00",
    "workHours": "9h"
  },
  {
    "id": 2341471,
    "employee": "Michael Brown",
    "role": "Sales Representative",
    "department": "Sales",
    "date": "04 August 2023",
    "status": "Late arrival",
    "checkIn": "9:45",
    "checkOut": "18:45",
    "workHours": "9h 0m"
  },
  {
    "id": 2341472,
    "employee": "Sarah Lee",
    "role": "HR Manager",
    "department": "Human Resources",
    "date": "29 July 2023",
    "status": "Absent",
    "checkIn": "00:00",
    "checkOut": "00:00",
    "workHours": "0m"
  },
  {
    "id": 2341473,
    "employee": "David Kim",
    "role": "Network Administrator",
    "department": "IT",
    "date": "30 July 2023",
    "status": "On time",
    "checkIn": "9:00",
    "checkOut": "18:00",
    "workHours": "9h"
  },
  {
    "id": 2341474,
    "employee": "Lisa Nguyen",
    "role": "Graphic Designer",
    "department": "Design",
    "date": "31 July 2023",
    "status": "On time",
    "checkIn": "8:30",
    "checkOut": "17:30",
    "workHours": "9h 30m"
  },
  {
    "id": 2341475,
    "employee": "Kevin White",
    "role": "Operations Manager",
    "department": "Operations",
    "date": "01 August 2023",
    "status": "Late arrival",
    "checkIn": "9:15",
    "checkOut": "18:15",
    "workHours": "9h"
  },
  {
    "id": 2341476,
    "employee": "Jessica Martin",
    "role": "Customer Service Representative",
    "department": "Customer Service",
    "date": "02 August 2023",
    "status": "On time",
    "checkIn": "8:45",
    "checkOut": "17:45",
    "workHours": "9h 0m"
  },
  {
    "id": 2341477,
    "employee": "Brian Hall",
    "role": "Software Developer",
    "department": "Development",
    "date": "03 August 2023",
    "status": "On time",
    "checkIn": "9:00",
    "checkOut": "18:00",
    "workHours": "9h"
  },
  {
    "id": 2341478,
    "employee": "Daniel Park",
    "role": "Financial Analyst",
    "department": "Finance",
    "date": "04 August 2023",
    "status": "Absent",
    "checkIn": "00:00",
    "checkOut": "00:00",
    "workHours": "0m"
  },
  {
    "id": 2341479,
    "employee": "Stephanie Lee",
    "role": "Product Manager",
    "department": "Product Management",
    "date": "05 August 2023",
    "status": "Late arrival",
    "checkIn": "9:30",
    "checkOut": "18:30",
    "workHours": "9h 30m"
  },
  {
    "id": 2341480,
    "employee": "James Kim",
    "role": "Business Development Manager",
    "department": "Business Development",
    "date": "05 August 2023",
    "status": "On time",
    "checkIn": "9:00",
    "checkOut": "18:00",
    "workHours": "9h"
  },
  {
    "id": 2341481,
    "employee": "Grace Lee",
    "role": "Content Writer",
    "department": "Marketing",
    "date": "04 August 2023",
    "status": "On time",
    "checkIn": "8:30",
    "checkOut": "17:30",
    "workHours": "9h 30m"
  },
  {
    "id": 2341482,
    "employee": "Andrew Park",
    "role": "Quality Assurance Engineer",
    "department": "QA",
    "date": "03 August 2023",
    "status": "Late arrival",
    "checkIn": "9:15",
    "checkOut": "18:15",
    "workHours": "9h"
  },
  {
    "id": 2341483,
    "employee": "Emily Chen",
    "role": "Data Scientist",
    "department": "Data Science",
    "date": "02 August 2023",
    "status": "On time",
    "checkIn": "8:00",
    "checkOut": "17:00",
    "workHours": "9h"
  },
  {
    "id": 2341484,
    "employee": "Matthew Lee",
    "role": "Technical Writer",
    "department": "Technical Writing",
    "date": "01 August 2023",
    "status": "Late arrival",
    "checkIn": "9:30",
    "checkOut": "18:30",
    "workHours": "9h 30m"
  },
  {
    "id": 2341485,
    "employee": "Jessica Kim",
    "role": "Project Coordinator",
    "department": "Project Management",
    "date": "31 July 2023",
    "status": "Absent",
    "checkIn": "00:00",
    "checkOut": "00:00",
    "workHours": "0m"
  },
  {
    "id": 2341486,
    "employee": "Daniel Lee",
    "role": "DevOps Engineer",
    "department": "DevOps",
    "date": "30 July 2023",
    "status": "On time",
    "checkIn": "9:00",
    "checkOut": "18:00",
    "workHours": "9h"
  },
  {
    "id": 2341487,
    "employee": "Sarah Kim",
    "role": "UX Researcher",
    "department": "Design",
    "date": "29 July 2023",
    "status": "Absent",
    "checkIn": "00:00",
    "checkOut": "00:00",
    "workHours": "0m"
  },
  {
    "id": 2341488,
    "employee": "Michael Brown",
    "role": "IT Support Specialist",
    "department": "IT",
    "date": "30 July 2023",
    "status": "Late arrival",
    "checkIn": "9:15",
    "checkOut": "18:15",
    "workHours": "9h"
  },
  {
    "id": 2341489,
    "employee": "Lisa Nguyen",
    "role": "Marketing Coordinator",
    "department": "Marketing",
    "date": "31 July 2023",
    "status": "On time",
    "checkIn": "8:45",
    "checkOut": "17:45",
    "workHours": "9h 0m"
  },
  {
    "id": 2341890,
    "employee": "Kevin White",
    "role": "Operations Coordinator",
    "department": "Operations",
    "date": "01 August 2023",
    "status": "On time",
    "checkIn": "9:00",
    "checkOut": "18:00",
    "workHours": "9h"
  },
  {
    "id": 2341891,
    "employee": "Jessica Martin",
    "role": "Customer Service Manager",
    "department": "Customer Service",
    "date": "02 August 2023",
    "status": "On time",
    "checkIn": "8:15",
    "checkOut": "17:15",
    "workHours": "9h"
  },
  {
    "id": 2341892,
    "employee": "Brian Hall",
    "role": "Software Architect",
    "department": "Development",
    "date": "03 August 2023",
    "status": "Late arrival",
    "checkIn": "9:30",
    "checkOut": "18:30",
    "workHours": "9h 30m"
  },
  {
    "id": 2341893,
    "employee": "Oliver Johnson",
    "role": "Project Manager",
    "department": "Management",
    "date": "04 August 2023",
    "status": "On time",
    "checkIn": "8:45",
    "checkOut": "17:45",
    "workHours": "9h 0m"
  },
  {
    "id": 2341894,
    "employee": "Sophia Williams",
    "role": "UX Designer",
    "department": "Design",
    "date": "05 August 2023",
    "status": "Late arrival",
    "checkIn": "9:15",
    "checkOut": "18:15",
    "workHours": "9h"
  },
  {
    "id": 2341895,
    "employee": "Alexander Brown",
    "role": "Sales Manager",
    "department": "Sales",
    "date": "06 August 2023",
    "status": "Absent",
    "checkIn": "00:00",
    "checkOut": "00:00",
    "workHours": "0m"
  },
  {
    "id": 2341896,
    "employee": "Hannah Lee",
    "role": "Marketing Analyst",
    "department": "Marketing",
    "date": "07 August 2023",
    "status": "On time",
    "checkIn": "9:00",
    "checkOut": "18:00",
    "workHours": "9h"
  },
  {
    "id": 2341897,
    "employee": "Ethan Kim",
    "role": "Software Engineer",
    "department": "Development",
    "date": "08 August 2023",
    "status": "On time",
    "checkIn": "8:30",
    "checkOut": "17:30",
    "workHours": "9h 30m"
  },
  {
    "id": 2341898,
    "employee": "Lily Chen",
    "role": "Data Analyst",
    "department": "Finance",
    "date": "09 August 2023",
    "status": "Late arrival",
    "checkIn": "9:15",
    "checkOut": "18:15",
    "workHours": "9h"
  },
  {
    "id": 2341899,
    "employee": "Julia Martin",
    "role": "Customer Service Representative",
    "department": "Customer Service",
    "date": "10 August 2023",
    "status": "On time",
    "checkIn": "8:45",
    "checkOut": "17:45",
    "workHours": "9h 0m"
  },
  {
    "id": 2341900,
    "employee": "Ryan Hall",
    "role": "IT Support Specialist",
    "department": "IT",
    "date": "29 July 2023",
    "status": "On time",
    "checkIn": "9:00",
    "checkOut": "18:00",
    "workHours": "9h"
  },
  {
    "id": 2341901,
    "employee": "Ava Lee",
    "role": "UX Researcher",
    "department": "Design",
    "date": "10 August 2023",
    "status": "On time",
    "checkIn": "8:30",
    "checkOut": "17:30",
    "workHours": "9h 30m"
  },
  {
    "id": 2341902,
    "employee": "Benjamin Brown",
    "role": "Operations Manager",
    "department": "Operations",
    "date": "09 August 2023",
    "status": "Late arrival",
    "checkIn": "9:15",
    "checkOut": "18:15",
    "workHours": "9h"
  },
  {
    "id": 2341903,
    "employee": "Charlotte Kim",
    "role": "Project Coordinator",
    "department": "Project Management",
    "date": "08 August 2023",
    "status": "Absent",
    "checkIn": "00:00",
    "checkOut": "00:00",
    "workHours": "0m"
  },
  {
    "id": 2341904,
    "employee": "Gabriel Martin",
    "role": "DevOps Engineer",
    "department": "DevOps",
    "date": "06 August 2023",
    "status": "On time",
    "checkIn": "9:00",
    "checkOut": "18:00",
    "workHours": "9h"
  },
  {
    "id": 2341905,
    "employee": "Harrison Lee",
    "role": "Technical Writer",
    "department": "Technical Writing",
    "date": "07 August 2023",
    "status": "Late arrival",
    "checkIn": "9:30",
    "checkOut": "18:30",
    "workHours": "9h 30m"
  },
  {
    "id": 2341906,
    "employee": "Isabella Chen",
    "role": "Marketing Coordinator",
    "department": "Marketing",
    "date": "05 August 2023",
    "status": "Absent",
    "checkIn": "00:00",
    "checkOut": "00:00",
    "workHours": "0m"
  },
  {
    "id": 2341907,
    "employee": "Julian Kim",
    "role": "Software Developer",
    "department": "Development",
    "date": "07 August 2023",
    "status": "On time",
    "checkIn": "8:30",
    "checkOut": "17:30",
    "workHours": "9h 30m"
  },
  {
    "id": 2341908,
    "employee": "Kate Martin",
    "role": "Customer Service Manager",
    "department": "Customer Service",
    "date": "09 August 2023",
    "status": "On time",
    "checkIn": "8:15",
    "checkOut": "17:15",
    "workHours": "9h"
  },
  {
    "id": 2341909,
    "employee": "Lucas Lee",
    "role": "UX Designer",
    "department": "Design",
    "date": "02 August 2023",
    "status": "Late arrival",
    "checkIn": "9:15",
    "checkOut": "18:15",
    "workHours": "9h"
  },
  {
    "id": 2341910,
    "employee": "Mia Kim",
    "role": "Data Scientist",
    "department": "Data Science",
    "date": "31 July 2023",
    "status": "On time",
    "checkIn": "9:00",
    "checkOut": "18:00",
    "workHours": "9h"
  },
  {
    "id": 2341911,
    "employee": "Natalie Brown",
    "role": "Marketing Analyst",
    "department": "Marketing",
    "date": "30 July 2023",
    "status": "On time",
    "checkIn": "8:45",
    "checkOut": "17:45",
    "workHours": "9h 0m"
  },
  {
    "id": 2341912,
    "employee": "Olivia Lee",
    "role": "Operations Coordinator",
    "department": "Operations",
    "date": "03 August 2023",
    "status": "Absent",
    "checkIn": "00:00",
    "checkOut": "00:00",
    "workHours": "0m"
  },
  {
    "id": 2341913,
    "employee": "Patrick Kim",
    "role": "Project Manager",
    "department": "Management",
    "date": "04 August 2023",
    "status": "On time",
    "checkIn": "8:30",
    "checkOut": "17:30",
    "workHours": "9h 30m"
  },
  {
    "id": 2341914,
    "employee": "Rachel Martin",
    "role": "IT Support Specialist",
    "department": "IT",
    "date": "10 August 2023",
    "status": "On time",
    "checkIn": "9:00",
    "checkOut": "18:00",
    "workHours": "9h"
  },
  {
    "id": 2341915,
    "employee": "Sophia Williams",
    "role": "UX Researcher",
    "department": "Design",
    "date": "31 July 2023",
    "status": "Late arrival",
    "checkIn": "9:15",
    "checkOut": "18:15",
    "workHours": "9h"
  },
  {
    "id": 2341916,
    "employee": "Thomas Brown",
    "role": "Sales Manager",
    "department": "Sales",
    "date": "05 August 2023",
    "status": "Absent",
    "checkIn": "00:00",
    "checkOut": "00:00",
    "workHours": "0m"
  },
  {
    "id": 2341917,
    "employee": "Victoria Lee",
    "role": "Marketing Coordinator",
    "department": "Marketing",
    "date": "06 August 2023",
    "status": "On time",
    "checkIn": "9:00",
    "checkOut": "18:00",
    "workHours": "9h"
  },
  {
    "id": 2341918,
    "employee": "William Kim",
    "role": "Software Engineer",
    "department": "Development",
    "date": "04 August 2023",
    "status": "Absent",
    "checkIn": "00:00",
    "checkOut": "00:00",
    "workHours": "0m"
  },
  {
    "id": 2341919,
    "employee": "Xavier Martin",
    "role": "Customer Service Representative",
    "department": "Customer Service",
    "date": "29 July 2023",
    "status": "On time",
    "checkIn": "8:15",
    "checkOut": "17:15",
    "workHours": "9h"
  },
  {
    "id": 2341920,
    "employee": "Yvonne Chen",
    "role": "Data Analyst",
    "department": "Finance",
    "date": "29 July 2023",
    "status": "Late arrival",
    "checkIn": "9:15",
    "checkOut": "18:15",
    "workHours": "9h"
  },
  {
    "id": 2341921,
    "employee": "Zachary Lee",
    "role": "DevOps Engineer",
    "department": "DevOps",
    "date": "29 July 2023",
    "status": "Absent",
    "checkIn": "00:00",
    "checkOut": "00:00",
    "workHours": "0m"
  }
]);
const savePointingTOLocalStorage = (pointing: Pointing[]) => {
  localStorage.setItem('pointing', JSON.stringify(pointing));
}


// Search Employee
const searchpoint = (query: String) => {
  return pointing.value.filter( employee =>
      employee.employee.toLowerCase().includes(recherche.value.toLowerCase())
      || employee.role.toLowerCase().includes(recherche.value.toLowerCase())
      || employee.department.toLowerCase().includes(recherche.value.toLowerCase())
      || employee.date.toLowerCase().includes(recherche.value.toLowerCase())
      || employee.status.toLowerCase().includes(recherche.value.toLowerCase())
      || employee.checkIn.toLowerCase().includes(recherche.value.toLowerCase())
      || employee.checkOut.toLowerCase().includes(recherche.value.toLowerCase()));
};
const pointingFiltres = computed(() => {
  let filtered = pointing.value;
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

const getPointingFromLocalStorage = () => {
  if(localStorage.getItem('pointing')) {
    pointing.value = JSON.parse(localStorage.getItem('pointing'))
  }
}

onBeforeMount(()=>{
  getPointingFromLocalStorage()
})

// Export csv file
const handleCheckboxChange = (selected: 'thisPage' | 'allPages') => {
  if (selected === 'thisPage') {
    allPages.value = false;
  } else {
    thisPage.value = false;
  }
};
const downloadCSV = async () => {
  if (thisPage.value) {
    await downloadCurrentPageCSV();
  } else if (allPages.value) {
    await downloadAllPagesCSV();
  } else {
    error.value = 'Please select an option';
  }
};
const downloadCurrentPageCSV = async () => {
  const data = getCurrentPageData();
  const csvContent = await convertToCSV(data);
  downloadFile(csvContent, 'Pointing Overview page-' + (currentPage.value + 1) + '.csv');
};
const downloadAllPagesCSV = async () => {
  const data = getAllPagesData();
  const csvContent = await convertToCSV(data);
  downloadFile(csvContent, 'Pointing overview.csv');
};
const getCurrentPageData = () => {
  const currentPage = 1;
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return employees.value.slice(startIndex, endIndex);
};
const getAllPagesData = (): any[] => {
  return JSON.parse(localStorage.getItem('pointing') || '[]');
};
const convertToCSV = (data) => {
  if (data.length === 0) return '';

  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(row => {
    return Object.values(row).map(value => `"${value}"`).join(',');
  }).join('\n');

  return `${headers}\n${rows}`;
};
const downloadFile = (content: string, fileName: string) => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const statusColor = (employee) => {
  if (employee.status === "On time") {
    return ['bg-blue-100 inline-block px-4 py-2 rounded-md text-blue-600 mt-3'];
  } else if (employee.status === "Absent") {
    return ['bg-red-100 inline-block px-4 py-2 rounded-md text-red-600 mt-3'];
  } else {
    return ['bg-yellow-100 inline-block px-4 py-2 rounded-md text-yellow-600 mt-3'];
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
const applyFilters = (pointing) => {
  if (allstatus.value) {
    return pointing;
  }
  return pointing.filter(employee => {
    if (ontime.value && employee.status === "On time") return true;
    if (latearrival.value && employee.status === "Late arrival") return true;
    if (absent.value && employee.status === "Absent") return true;
    return false;
  });
};
</script>
