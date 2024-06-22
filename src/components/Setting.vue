<template>
  <div class="bg-gray-100">
    <Header />
    <div class="flex flex-col">
      <div class="flex flex-1">
        <div class="flex flex-col justify-center items-center">
          <Sidebar />
        </div>

        <div class="flex-1 p-12 grid grid-cols-1 md:grid-cols-4 gap-10 mx-28 mr-36 mt-2">
          <Card
              @click="openGeneral"
              :title="$t('general')"
              img="src/components/icons/General.svg"
          />
          <Card
              :title="$t('leave')"
              img="src/components/icons/Leave.svg"
          />
          <Card
              :title="$t('card')"
              img="src/components/icons/Card.svg"
          />
          <Card
              :title="$t('sites')"
              img="src/components/icons/Sites.svg"
          />
          <Card
              :title="$t('positions')"
              img="src/components/icons/Positions.svg"
          />
          <Card
              :title="$t('schedules')"
              img="src/components/icons/Schedules.svg"
          />
          <Card
              :title="$t('contacts')"
              img="src/components/icons/Contacts.svg"
          />
          <Card
              @click="openLogout"
              :title="$t('logout')"
              img="src/components/icons/Logout.svg"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- General -->
  <transition name="fade">
    <div v-if="isGeneral" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="w-full px-4 pt-16">
        <div class="mx-auto w-full max-w-xl rounded-2xl bg-white p-8">
          <div class="flex justify-between pb-6">
            <h3 class="text-2xl bold font-bold text-blue-900 "><strong>{{ $t('general') }}</strong></h3>
            <div class="bg-blue-100 rounded-lg h-8 p-1 hover:bg-blue-300" @click="closeGeneral">
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
              <span>{{ $t('employeesOverview.infomationspersonnelles') }}</span>
              <ChevronUpIcon
                  :class="open ? 'rotate-180 transform' : ''"
                  class="h-5 w-5 text-purple-500"
              />
            </DisclosureButton>
            <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500">
              <div class="flex justify-between">
                <div  class="pr-16">
                  <strong>{{ $t('employeesOverview.name') }} : <span class="text-blue-700">{{ user_name }}</span></strong>
                  <br><br>
                  <strong>{{ $t('employeesOverview.phoneNumber') }} : <span class="text-blue-700">+237-653-492-410</span></strong>
                </div>
                <div>
                  <strong>{{ $t('employeesOverview.email') }} : <span class="text-blue-700">{{ user_email }}</span></strong>
                  <br><br>
                  <strong>{{ $t('employeesOverview.password') }} : <span class="text-blue-700">********</span></strong>
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>
          <Disclosure as="div" class="mt-2" v-slot="{ open }">
            <DisclosureButton
                class="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
            >
              <span>{{ $t('employeesOverview.compagny') }}</span>
              <ChevronUpIcon
                  :class="open ? 'rotate-180 transform' : ''"
                  class="h-5 w-5 text-purple-500"
              />
            </DisclosureButton>
            <DisclosurePanel class="px-4 pb-5 pt-4 text-sm text-gray-500">
              <div class="flex justify-between">
                <div>
                  <strong>{{ $t('company_name') }} : <span class="text-blue-700">LAO SARL</span></strong>
                  <br><br>
                  <strong>{{ $t('address') }} : <span class="text-blue-700">Logpom Bassong</span></strong>
                  <br><br>
                  <strong>{{ $t('work_days_per_week') }} : <span class="text-blue-700">6</span></strong>
                </div>
                <div>
                  <strong>{{ $t('employees') }} : <span class="text-blue-700">{{ totalEmployees }}</span></strong>
                  <br><br>
                  <strong>{{ $t('activity_area') }} : <span class="text-blue-700">IT Service Provider</span></strong>
                  <br><br>
                  <strong>{{ $t('subscription') }} : <span class="text-blue-700">Standart</span></strong>
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>
            <button @click="" class="mt-4 inline-flex ml-52 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-950 hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
              {{ $t('edit') }}
            </button>
        </div>
      </div>
    </div>
  </transition>

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

<script setup lang="ts">
import Card from '../components/Card.vue';
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import {computed, ref} from "vue";
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import {ChevronUpIcon} from "@heroicons/vue/20/solid";
import router from "@/router";
import {useStorage} from "@vueuse/core";
const user_name = localStorage.getItem('adminName');
const user_email = localStorage.getItem('adminEmail');
const employees = useStorage('employees', []);

const totalEmployees = computed(() => employees.value.length);

// LogOut
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

// General
const isGeneral = ref(false);
const closeGeneral = () => {
  isGeneral.value = false;
};
const openGeneral = () => {
  isGeneral.value = true;
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