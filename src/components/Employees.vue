<template>
  <div class="bg-gray-100 ">
    <Header />
    <div class="min-h-screen flex flex-col">
      <div class="flex flex-1">
        <div class="flex flex-col justify-center items-center">
          <Sidebar />
        </div>
        <div class="flex flex-1 flex-col items-center overflow-hidden">
          <div class="lg:w-[90rem] md:w-[40rem]  sm:w-[25rem] bg-white rounded-2xl px-6 py-5 mt-16 shadow-2xl">
            <div class="flex items-center justify-between mb-5 p-5">
              <h1 class="text-3xl font-light text-gray-800">Employees <br> Overview</h1>
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
                          <input type="checkbox" id="logpom" v-model="logpom" class="mr-2" @click="filterCheckboxChange('logpom')">
                          <label for="logpom" class="font-light">Logpom</label>
                        </div>
                        <div class="p-3">
                          <input type="checkbox" id="bali" v-model="bali" class="mr-2" @click="filterCheckboxChange('bali')">
                          <label for="bali" class="font-light">Bali</label>
                        </div>
                      </div>
                      <div class="flex">
                        <div class="p-3 mr-1">
                          <input type="checkbox" id="yansoki" v-model="yansoki" class="mr-2" @click="filterCheckboxChange('yansoki')">
                          <label for="yansoki" class="font-light">Yansoki</label>
                        </div>
                        <div class="p-3">
                          <input type="checkbox" id="akwa" v-model="akwa" class="mr-2" @click="filterCheckboxChange('akwa')">
                          <label for="akwa" class="font-light">Akwa</label>
                        </div>
                      </div>
                      <div class="flex">
                        <div class="p-3">
                          <input type="checkbox" id="bonapriso" v-model="bonapriso" class="mr-2" @click="filterCheckboxChange('bonapriso')">
                          <label for="bonapriso" class="font-light">Bonapriso</label>
                        </div>
                        <div class="p-3 -ml-3.5">
                          <input type="checkbox" id="allsites" v-model="allsites" class="mr-2" @click="filterCheckboxChange">
                          <label for="allsites" class="font-light">All sites</label>
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
                      @click="searchemp(recherche)"
                  >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <button class="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-xl mr-3 flex" @click="openNewemp">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-1">
                    <g opacity="0.5">
                      <path d="M20.25 12H3.75" stroke="#252C58" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 20.25V3.75" stroke="#252C58" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                  </svg>
                  <p class="font-light">Add Employee</p>
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
                  <th scope="col" class="px-6 py-3">Téléphone</th>
                  <th scope="col" class="px-6 py-3">Email</th>
                  <th scope="col" class="px-6 py-3">Site</th>
                  <th scope="col" class="px-6 py-3">Matricule</th>
                </tr>
                </thead>
                <tbody>
                <tr
                    class="border-b-gray-100 border-b-2 hover:bg-blue-50 cursor-pointer"
                    v-for="employee in pageEmployees"
                    :key="employee.id">
                  <td class="text-gray-900 p-5">{{ employee.id }}</td>
                  <td class="text-gray-900">{{ employee.employee }}</td>
                  <td>{{ employee.role }}</td>
                  <td>{{ employee.téléphone }}</td>
                  <td>{{ employee.email }}</td>
                  <td>{{ employee.site }}</td>
                  <td>{{ employee.matricule }}</td>
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

<!--   Add Employee -->
    <transition name="fade">
      <div v-if="isNewemp" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="w-full px-4">
          <div class="mx-auto w-full max-w-xl rounded-2xl bg-white p-8">
            <div class="flex justify-between pb-6">
              <h3 class="text-2xl bold font-bold text-blue-900 "><strong>Add Employee</strong></h3>
              <div class="bg-blue-100 rounded-lg h-8 p-1 hover:bg-blue-300" @click="closeNewemp">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.75 5.25L5.25 18.75" stroke="#252C58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18.75 18.75L5.25 5.25" stroke="#252C58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <Disclosure v-slot="{ open }">
              <DisclosureButton
                  class="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
              >
                <span>Personnal Informations</span>
                <ChevronUpIcon
                    :class="open ? 'rotate-180 transform' : ''"
                    class="h-5 w-5 text-purple-500"
                />
              </DisclosureButton>
              <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500">
                <form @submit.prevent="Add">
                  <div class="flex">
                    <div class="mb-4 mr-10">
                      <label for="user_nom" class="block text-gray-700">Name<span class="text-red-600">*</span></label>
                      <input
                          v-model="user_name"
                          type="text"
                          id="user_nom"
                          class="mt-2 p-2 w-full border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom"
                          required
                      />
                    </div>
                    <div class="mb-4">
                      <label for="user_telephone" class="block text-gray-700">Phone Number</label>
                      <input
                          v-model="user_telephone"
                          type="tel"
                          id="user_telephone"
                          class="mt-2 p-2 w-full border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom"
                          placeholder="+2376********"
                      />
                    </div>
                  </div>
                </form>
              </DisclosurePanel>
            </Disclosure>
            <Disclosure as="div" class="mt-2" v-slot="{ open }">
              <DisclosureButton
                  class="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
              >
                <span>Professional Information</span>
                <ChevronUpIcon
                    :class="open ? 'rotate-180 transform' : ''"
                    class="h-5 w-5 text-purple-500"
                />
              </DisclosureButton>
              <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500">
                <form @submit.prevent="add">
                  <div class="flex">
                    <div class="mb-4 mr-10">
                      <label for="role" class="block text-gray-700">Role<span class="text-red-600">*</span></label>
                      <input
                          v-model="user_role"
                          type="text"
                          id="user_role"
                          class="mt-2 p-2 w-full border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom"
                          required
                      />
                    </div>
                    <div class="mb-4">
                      <label for="user_site" class="block text-gray-700">Site<span class="text-red-600">*</span></label>
                      <input
                          v-model="user_site"
                          type="text"
                          id="user_site"
                          class="mt-2 p-2 w-full border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom"
                          required
                      />
                    </div>
                  </div>
                  <div class="flex">
                    <div class="mb-4 mr-10">
                      <label for="matricule" class="block text-gray-700">Matricule<span class="text-red-600">*</span></label>
                      <input
                          v-model="matricule"
                          type="text"
                          id="matricule"
                          class="mt-2 p-2 w-full border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom placeholder: "
                      />
                    </div>
                    <div class="mb-4">
                      <label for="email" class="block text-gray-700">Email<span class="text-red-600">*</span></label>
                      <input
                          v-model="email"
                          type="email"
                          id="email"
                          class="mt-2 p-2 w-full border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom"
                      />
                    </div>
                  </div>
                  <div class="flex">
                    <div class="mb-6 mr-8">
                      <label for="password" class="block text-gray-700">Password<span class="text-red-600">*</span></label>
                      <input
                          v-model="password"
                          type="text"
                          id="password"
                          class="mt-2 p-2 w-full border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom"
                      />
                    </div>
                    <div class="ml-12">
                      <button
                          class="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl flex  mt-7 w-full p-2"
                          @click="generate"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                          <path d="M16.5156 9.34814H21.0156V4.84814" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M6.16602 6.16637C6.9321 5.40029 7.84157 4.7926 8.84251 4.37799C9.84344 3.96339 10.9162 3.75 11.9996 3.75C13.0831 3.75 14.1558 3.96339 15.1568 4.37799C16.1577 4.7926 17.0672 5.40029 17.8333 6.16637L21.0153 9.34835" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M7.48438 14.6519H2.98438V19.1519" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M17.8336 17.8338C17.0675 18.5999 16.1581 19.2076 15.1571 19.6222C14.1562 20.0368 13.0834 20.2502 12 20.2502C10.9166 20.2502 9.84378 20.0368 8.84285 19.6222C7.84191 19.2076 6.93244 18.5999 6.16635 17.8338L2.98438 14.6519" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <p class="font-light">Generate</p>
                      </button>
                    </div>
                  </div>
                </form>
              </DisclosurePanel>
            </Disclosure>
            <p v-if="error" class="text-red-500 text-xs font-bold text-center mb-2">{{ error }}</p>
            <div class="mt-5 border-t-gray-100 border-t-2 mb-5"></div>
            <button @click="addEmployee" class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-950 hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
              Save
            </button>
            <button @click="closeNewemp" class="ml-5 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </transition>

</template>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import {computed, onBeforeMount, ref} from "vue";
import {ChevronUpIcon} from "@heroicons/vue/20/solid";
import {Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverPanel} from "@headlessui/vue";
import Employees from "@/components/Employees.vue";

const recherche = ref('');
const user_site = ref('');
const user_role = ref('');
const user_telephone= ref('');
const user_name = ref('');
const matricule = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const thisPage = ref(false);
const allPages = ref(false);
const currentPage = ref(0);
const bonapriso = ref(false);
const logpom = ref(false);
const akwa = ref(false);
const bali = ref(false);
const yansoki = ref(false);
const allsites = ref(true);

const employees = ref<Array>([
  {
    "id": 2341421,
    "employee": "Ahmed Rashdan",
    "role": "Help Desk Executive",
    "téléphone": "+237655510637",
    "site": "Logpom",
    "matricule": "Os11e4d1sz4",
    "email": "Ahmedsz4@nomdedomaine.com",
    "password": "AhdRashdan123!"
  },
  {
    "id": 2341422,
    "employee": "Kadi Manela",
    "role": "System coordinator",
    "téléphone": "+237677812345",
    "site": "Yansoki",
    "matricule": "Ya12e5d2sz5",
    "email": "Kadisz5@nomdedomaine.com",
    "password": "KadManela456@"
  },
  {
    "id": 2341423,
    "employee": "John Doe",
    "role": "Software Engineer",
    "téléphone": "+237699876543",
    "site": "Bali",
    "matricule": "Ba13e6d3sz6",
    "email": "Johnsz6@nomdedomaine.com",
    "password": "JohDoe789#"
  },
  {
    "id": 2341424,
    "employee": "Jane Smith",
    "role": "Marketing Manager",
    "téléphone": "+237622334567",
    "site": "Akwa",
    "matricule": "Ak14e7d4sz7",
    "email": "Janesz7@nomdedomaine.com",
    "password": "JanSmi890*"
  },
  {
    "id": 2341425,
    "employee": "Emily Chen",
    "role": "Data Analyst",
    "téléphone": "+237688765432",
    "site": "Bonapriso",
    "matricule": "Bo15e8d5sz8",
    "email": "Emilsz8@nomdedomaine.com",
    "password": "EmiChe901@"
  },
  {
    "id": 2341426,
    "employee": "Michael Brown",
    "role": "Sales Representative",
    "téléphone": "+237655678901",
    "site": "Logpom",
    "matricule": "Os16e9d6sz9",
    "email": "Micsz9@nomdedomaine.com",
    "password": "MicBro234$"
  },
  {
    "id": 2341427,
    "employee": "Sarah Lee",
    "role": "HR Manager",
    "téléphone": "+237677890123",
    "site": "Yansoki",
    "matricule": "Ya17e10d7sz10",
    "email": "Sarsz0@nomdedomaine.com",
    "password": "SarLee567#"
  },
  {
    "id": 2341428,
    "employee": "David Kim",
    "role": "Network Administrator",
    "téléphone": "+237699012345",
    "site": "Bali",
    "matricule": "Ba18e11d8sz11",
    "email": "Davisz1@nomdedomaine.com",
    "password": "DavKim890*"
  },
  {
    "id": 2341429,
    "employee": "Lisa Nguyen",
    "role": "Graphic Designer",
    "téléphone": "+237622123456",
    "site": "Akwa",
    "matricule": "Ak19e12d9sz12",
    "email": "Lisz2@nomdedomaine.com",
    "password": "LisNgu456@"
  },
  {
    "id": 2341430,
    "employee": "Kevin White",
    "role": "Operations Manager",
    "téléphone": "+237688234567",
    "site": "Bonapriso",
    "matricule": "Bo20e13d10sz13",
    "email": "Kevsz3@nomdedomaine.com",
    "password": "KevWhi789#"
  },
  {
    "id": 2341431,
    "employee": "Jessica Martin",
    "role": "Customer Service Representative",
    "téléphone": "+237655345678",
    "site": "Logpom",
    "matricule": "Os21e14d11sz14",
    "email": "Jessz4@nomdedomaine.com",
    "password": "JesMar901@"
  },
  {
    "id": 2341432,
    "employee": "Brian Hall",
    "role": "Software Developer",
    "téléphone": "+237677456789",
    "site": "Yansoki",
    "matricule": "Ya22e15d12sz15",
    "email": "Brisz5@nomdedomaine.com",
    "password": "BriHal234$"
  },
  {
    "id": 2341433,
    "employee": "Daniel Park",
    "role": "Financial Analyst",
    "téléphone": "+237699567890",
    "site": "Bali",
    "matricule": "Ba23e16d13sz16",
    "email": "Dansz6@nomdedomaine.com",
    "password": "DanPar567#"
  },
  {
    "id": 2341434,
    "employee": "Stephanie Lee",
    "role": "Product Manager",
    "téléphone": "+237622567890",
    "site": "Akwa",
    "matricule": "Ak24e17d14sz17",
    "email": "Stesz7@nomdedomaine.com",
    "password": "SteLee890*"
  },
  {
    "id": 2341435,
    "employee": "James Kim",
    "role": "Business Development Manager",
    "téléphone": "+237688678901",
    "site": "Bonapriso",
    "matricule": "Bo25e18d15sz18",
    "email": "Jamsz8@nomdedomaine.com",
    "password": "JamKim901@"
  },
  {
    "id": 2341436,
    "employee": "Grace Lee",
    "role": "Content Writer",
    "téléphone": "+237655789012",
    "site": "Logpom",
    "matricule": "Os26e19d16sz19",
    "email": "Grasz9@nomdedomaine.com",
    "password": "GraLee234$"
  },
  {
    "id": 2341437,
    "employee": "Andrew Park",
    "role": "Quality Assurance Engineer",
    "téléphone": "+237677890123",
    "site": "Yansoki",
    "matricule": "Ya27e20d17sz20",
    "email": "Andsz0@nomdedomaine.com",
    "password": "AndPar567#"
  },
  {
    "id": 2341438,
    "employee": "Emily Chen",
    "role": "Data Scientist",
    "téléphone": "+237699012345",
    "site": "Bali",
    "matricule": "Ba28e21d18sz21",
    "email": "Emisz1@nomdedomaine.com",
    "password": "EmiChe890*"
  },
  {
    "id": 2341439,
    "employee": "Matthew Lee",
    "role": "Technical Writer",
    "téléphone": "+237622123456",
    "site": "Akwa",
    "matricule": "Ak29e22d19sz22",
    "email": "Matsz2@nomdedomaine.com",
    "password": "MatLee901@"
  },
  {
    "id": 2341440,
    "employee": "Jessica Kim",
    "role": "Project Coordinator",
    "téléphone": "+237688234567",
    "site": "Bonapriso",
    "matricule": "Bo30e23d20sz23",
    "email": "Jessz3@nomdedomaine.com",
    "password": "JesKim234$"
  },
  {
    "id": 2341441,
    "employee": "Daniel Lee",
    "role": "DevOps Engineer",
    "téléphone": "+237655345678",
    "site": "Logpom",
    "matricule": "Os31e24d21sz24",
    "email": "Dansz4@nomdedomaine.com",
    "password": "DanLee567#"
  },
  {
    "id": 2341442,
    "employee": "Sarah Kim",
    "role": "UX Researcher",
    "téléphone": "+237677456789",
    "site": "Yansoki",
    "matricule": "Ya32e25d22sz25",
    "email": "Sarsz5@nomdedomaine.com",
    "password": "SarKim901@"
  },
  {
    "id": 2341443,
    "employee": "Kevin Park",
    "role": "Front-end Developer",
    "téléphone": "+237699567890",
    "site": "Bali",
    "matricule": "Ba33e26d23sz26",
    "email": "Kevsz6@nomdedomaine.com",
    "password": "KevPark901#"
  },
  {
    "id": 2341444,
    "employee": "Kelly Lee",
    "role": "Accountant",
    "téléphone": "+237622890124",
    "site": "Akwa",
    "matricule": "Ak34e27d24sz27",
    "email": "Kellsz7@nomdedomaine.com",
    "password": "KelLee123*"
  },
  {
    "id": 2341445,
    "employee": "Bryan Chen",
    "role": "Graphic Designer",
    "téléphone": "+237688012346",
    "site": "Bonapriso",
    "matricule": "Bo35e28d25sz28",
    "email": "Brysza@nomdedomaine.com",
    "password": "BryChen123$"
  },
  {
    "id": 2341446,
    "employee": "Chris Park",
    "role": "Sales Manager",
    "téléphone": "+237655123457",
    "site": "Logpom",
    "matricule": "Os36e29d26sz29",
    "email": "Chrsz8@nomdedomaine.com",
    "password": "ChrPark901#"
  },
  {
    "id": 2341447,
    "employee": "Natalie Kim",
    "role": "HR Manager",
    "téléphone": "+237677234568",
    "site": "Yansoki",
    "matricule": "Ya37e30d30sz30",
    "email": "Natsz9@nomdedomaine.com",
    "password": "NatKim901@"
  },
  {
    "id": 2341448,
    "employee": "Timothy Lee",
    "role": "IT Manager",
    "téléphone": "+237699234569",
    "site": "Bali",
    "matricule": "Ba38e31d31sz31",
    "email": "Timsz10@nomdedomaine.com",
    "password": "TimLee901#"
  },
  {
    "id": 2341449,
    "employee": "Lily Park",
    "role": "Business Analyst",
    "téléphone": "+237655012347",
    "site": "Akwa",
    "matricule": "Ak39e32d32sz32",
    "email": "Lilsz11@nomdedomaine.com",
    "password": "LilPark901@"
  },
  {
    "id": 2341450,
    "employee": "Matthew Chen",
    "role": "Business Analyst",
    "téléphone": "+237688012348",
    "site": "Bonapriso",
    "matricule": "Bo39e33d33sz33",
    "email": "Matz12@nomdedomaine.com",
    "password": "MatChen123*"
  },
  {
    "id": 2341451,
    "employee": "Jessica Park",
    "role": "UX Designer",
    "téléphone": "+237655123459",
    "site": "Logpom",
    "matricule": "Os40e34d34sz34",
    "email": "Jessz13@nomdedomaine.com",
    "password": "JesPar901#"
  },
  {
    "id": 2341452,
    "employee": "Andrew Kim",
    "role": "Software Developer",
    "téléphone": "+237677234570",
    "site": "Yansoki",
    "matricule": "Ya41e35d35sz35",
    "email": "Andsza@nomdedomaine.com",
    "password": "AndKim123$"
  },
  {
    "id": 2341453,
    "employee": "Jessica Nguyen",
    "role": "Project Manager",
    "téléphone": "+237699234571",
    "site": "Bali",
    "matricule": "Ba42e36d36sz36",
    "email": "Jessb@nomdedomaine.com",
    "password": "JesNgu901@"
  },
  {
    "id": 2341454,
    "employee": "Stephanie Chen",
    "role": "Data Analyst",
    "téléphone": "+237655012349",
    "site": "Akwa",
    "matricule": "Ak43e37d37sz37",
    "email": "Stephcz@nomdedomaine.com",
    "password": "SteChen123*"
  },
  {
    "id": 2341455,
    "employee": "James Nguyen",
    "role": "Software Engineer",
    "téléphone": "+237688012350",
    "site": "Bonapriso",
    "matricule": "Bo44e38d38sz38",
    "email": "Jamnguy@nomdedomaine.com",
    "password": "JamNgu901#"
  },
  {
    "id": 2341456,
    "employee": "Grace Nguyen",
    "role": "Content Writer",
    "téléphone": "+237655123451",
    "site": "Logpom",
    "matricule": "Os45e39d39sz39",
    "email": "Gracenguy@nomdedomaine.com",
    "password": "GraNgu901@"
  },
  {
    "id": 2341457,
    "employee": "Andrew Nguyen",
    "role": "QA Engineer",
    "téléphone": "+237677234572",
    "site": "Yansoki",
    "matricule": "Ya46e40d40sz40",
    "email": "Andnguy@nomdedomaine.com",
    "password": "AndNgu123*"
  },
  {
    "id": 2341458,
    "employee": "Jessica White",
    "role": "Project Coordinator",
    "téléphone": "+237699234573",
    "site": "Bali",
    "matricule": "Ba47e41d41sz41",
    "email": "Jesswhi@nomdedomaine.com",
    "password": "JesWhi901#"
  },
  {
    "id": 2341459,
    "employee": "Stephanie Lee",
    "role": "UX Designer",
    "téléphone": "+237655012352",
    "site": "Akwa",
    "matricule": "Ak48e42d42sz42",
    "email": "Steplsz@nomdedomaine.com",
    "password": "SteLee123$"
  },
  {
    "id": 2341460,
    "employee": "James Lee",
    "role": "Software Developer",
    "téléphone": "+237688012353",
    "site": "Bonapriso",
    "matricule": "Bo49e43d43sz43",
    "email": "Jamnguy@nomdedomaine.com",
    "password": "JamNgu123#"
  },
  {
    "id": 2341461,
    "employee": "Grace Lee",
    "role": "Content Writer",
    "téléphone": "+237655123454",
    "site": "Logpom",
    "matricule": "Os49e44d44sz44",
    "email": "Gracenguy@nomdedomaine.com",
    "password": "GraLee123@"
  },
  {
    "id": 2341462,
    "employee": "Andrew Lee",
    "role": "QA Engineer",
    "téléphone": "+237677234575",
    "site": "Yansoki",
    "matricule": "Ya50e45d45sz45",
    "email": "Andnguy@nomdedomaine.com",
    "password": "AndLee123*"
  },
  {
    "id": 2341463,
    "employee": "Jessica Lee",
    "role": "Project Coordinator",
    "téléphone": "+237699234576",
    "site": "Bali",
    "matricule": "Ba51e46d46sz46",
    "email": "Jesswhi@nomdedomaine.com",
    "password": "JesLee123*"
  },
  {
    "id": 2341464,
    "employee": "Stephanie Johnson",
    "role": "UX Designer",
    "téléphone": "+237655012355",
    "site": "Akwa",
    "matricule": "Ak52e47d47sz47",
    "email": "Steplsz@nomdedomaine.com",
    "password": "SteJoh123$"
  },
  {
    "id": 2341465,
    "employee": "James Johnson",
    "role": "Software Developer",
    "téléphone": "+237688012356",
    "site": "Bonapriso",
    "matricule": "Bo53e48d48sz48",
    "email": "Jamnguy@nomdedomaine.com",
    "password": "JamNgu123@"
  },
  {
    "id": 2341466,
    "employee": "Grace Johnson",
    "role": "Content Writer",
    "téléphone": "+237655123457",
    "site": "Logpom",
    "matricule": "Os54e49d49sz49",
    "email": "Gracenguy@nomdedomaine.com",
    "password": "GraJoh123*"
  },
  {
    "id": 2341467,
    "employee": "Andrew Johnson",
    "role": "QA Engineer",
    "téléphone": "+237677234577",
    "site": "Yansoki",
    "matricule": "Ya55e50d50sz50",
    "email": "Andnguy@nomdedomaine.com",
    "password": "AndJoh123#"
  }
]);
const saveEmployeesToLocalStorage = (employees: Employee[]) => {
  localStorage.setItem('employees', JSON.stringify(employees));
}

// Search Employee
const searchemp = (query: String) => {
  return employees.value.filter(employee =>
      employee.employee.toLowerCase().includes(recherche.value.toLowerCase())
      || employee.role.toLowerCase().includes(recherche.value.toLowerCase())
      || employee.email.toLowerCase().includes(recherche.value.toLowerCase())
      || employee.site.toLowerCase().includes(recherche.value.toLowerCase())
      || employee.téléphone.toLowerCase().includes(recherche.value.toLowerCase()));
}
const employeesFiltres = computed(() => {
  let filtered = employees.value;
  if (recherche.value) {
    filtered = searchemp(recherche.value);
  }
  return applyFilters(filtered);
});
const totalPages = computed(() => {
  return Math.ceil(employeesFiltres.value.length / 10);
});
let pageEmployees = computed(() => {
  const start = currentPage.value * 10;
  return employeesFiltres.value.slice(start, start + 10);
});
const goToPage = (page:number) => {
  if (page >= 0 && page < totalPages.value) {
    currentPage.value = page;
  }
};

// New Employee window
const isNewemp = ref(false);
const closeNewemp = () => {
  isNewemp.value = false;
  error.value = '';
};
const openNewemp = () => {
  isNewemp.value = true;
};

const getEmployeesFromLocalStorage = () => {
  if (localStorage.getItem('employees')){
    employees.value = JSON.parse(localStorage.getItem('employees'))
  }
}

onBeforeMount(()=>{
  getEmployeesFromLocalStorage()
})

// Add Employee
const addEmployee = () => {
  let lastId = 0;
  if (employees.value && employees.value.length > 0) {
    lastId = employees.value[employees.value.length - 1].id;
  }

  const newEmployee = {
    id: lastId + 1,
    matricule: matricule.value,
    employee: user_name.value,
    role: user_role.value,
    site: user_site.value,
    téléphone: user_telephone.value,
    email: email.value,
    password: password.value,
  };

  employees.value.push(newEmployee);
  saveEmployeesToLocalStorage(employees.value)
  localStorage.setItem('employees', JSON.stringify(employees.value));

  closeNewemp();
  recherche.value = ('');
  error.value = ('');
  user_name.value = '';
  user_role.value = '';
  user_telephone.value = '';
  email.value = '';
  user_site.value = '';
  matricule.value = '';
  password.value = '';
}

// Generate
const generate = () => {
  if (!user_site.value) {
    error.value = 'Le site doit être renseigné !';
    return;
  }
  if (!user_name.value) {
    error.value = 'Le nom doit être renseigné !';
    return;
  }
  error.value = '';
  matricule.value = generateMatricule(user_site.value);
  email.value = generateEmail(user_name.value, matricule.value, '@nomdedomaine.com');
  password.value = generatePassword();
};
const generateMatricule = (site:string) => {
  let generatedMatricule = site.slice(0, 2) + generateRandomString(10);
  if (employees.value && employees.value.some(emp => emp.matricule === generatedMatricule)) {
    while (employees.value.some(emp => emp.matricule === generatedMatricule)) {
      const randomNb = Math.floor(Math.random() * 1000);
      generatedMatricule = site.slice(0, 2) + randomNb.toString().padStart(4, '0');
    }
  }
  return generatedMatricule;
};
const generateEmail = (name:string, matricule:string, domain:string) => {
  return `${name.slice(0, 4)}${matricule.slice(-3)}${domain}`;
};
const generatePassword = () => {
  let password = '';
  const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@/_|.#~=+*-';

  while (password.length < 12) {
    const randomIndex = Math.floor(Math.random() * possibleChars.length);
    password += possibleChars[randomIndex];
  }

  if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@/_|.#~=+*-]).*$/.test(password)) {
    return generatePassword();
  }
  return password;
};
const generateRandomString = (length:number) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

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
  downloadFile(csvContent, 'Employee Overview page-' + (currentPage.value + 1) + '.csv');
};
const downloadAllPagesCSV = async () => {
  const data = getAllPagesData();
  const csvContent = await convertToCSV(data);
  downloadFile(csvContent, 'Employees list.csv');
};
const getCurrentPageData = () => {
  const currentPage = 1;
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return employees.value.slice(startIndex, endIndex);
};
const getAllPagesData = (): any[] => {
  return JSON.parse(localStorage.getItem('employees') || '[]');
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

// Filter
const filterCheckboxChange = (selected: 'bonapriso' | 'yansoki' | 'bali' | 'akwa' | 'logpom' | 'allsites') => {
  if (selected === 'logpom') {
    allsites.value = false;
    bonapriso.value = false;
    yansoki.value = false;
    bali.value = false;
    akwa.value = false;
  } else if ( selected === 'bonapriso') {
    akwa.value = false;
    logpom.value = false;
    yansoki.value = false;
    bali.value = false;
    allsites.value = false;
  } else if ( selected === 'akwa') {
    bonapriso.value = false;
    yansoki.value = false;
    logpom.value = false;
    bali.value = false;
    allsites.value = false;
  } else if (selected === 'bali') {
    akwa.value = false;
    logpom.value = false;
    yansoki.value = false;
    bonapriso.value = false;
    allsites.value = false;
  } else if (selected === 'yansoki') {
    akwa.value = false;
    logpom.value = false;
    bali.value = false;
    allsites.value = false;
    bonapriso.value = false
  } else {
    akwa.value = false;
    logpom.value = false;
    bali.value = false;
    bonapriso.value = false;
    yansoki.value = false;
  }
};
const applyFilters = (employees) => {
  if (allsites.value) {
    return employees;
  }
  return employees.filter(employee => {
    if (bonapriso.value && employee.site === "Bonapriso") return true;
    if (yansoki.value && employee.site === "Yansoki") return true;
    if (bali.value && employee.site === "Bali") return true;
    if (logpom.value && employee.site === "Logpom") return true;
    if (akwa.value && employee.site === "Akwa") return true;
    return false;
  });
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>