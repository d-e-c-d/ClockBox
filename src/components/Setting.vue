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
              title="General"
              img="src/components/icons/General.svg"
          />
          <Card
              title="Leave Requests"
              img="src/components/icons/Leave.svg"
          />
          <Card
              title="View Subscription"
              img="src/components/icons/Card.svg"
          />
          <Card
              title="Sites"
              img="src/components/icons/Sites.svg"
          />
          <Card
              title="Positions"
              img="src/components/icons/Positions.svg"
          />
          <Card
              title="Schedules"
              img="src/components/icons/Schedules.svg"
          />
          <Card
              title="Contacts"
              img="src/components/icons/Contacts.svg"
          />
          <Card
              @click="openLogout"
              title="LogOut"
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
            <h3 class="text-2xl bold font-bold text-blue-900 "><strong>General</strong></h3>
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
              <span>Personnal Informations</span>
              <ChevronUpIcon
                  :class="open ? 'rotate-180 transform' : ''"
                  class="h-5 w-5 text-purple-500"
              />
            </DisclosureButton>
            <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500">
              <div class="flex justify-between">
                <div>
                  <strong>Name :</strong>
                  <br>
                  <br>
                  <strong>Phone Number :</strong>
                  <br>
                  <br>
                </div>
                <div class="mr-32">
                  <strong>Email :</strong>
                  <br>
                  <br>
                  <strong>Password :</strong>
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>
          <Disclosure as="div" class="mt-2" v-slot="{ open }">
            <DisclosureButton
                class="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
            >
              <span>Company Information</span>
              <ChevronUpIcon
                  :class="open ? 'rotate-180 transform' : ''"
                  class="h-5 w-5 text-purple-500"
              />
            </DisclosureButton>
            <DisclosurePanel class="px-4 pb-5 pt-4 text-sm text-gray-500">
              <div class="flex justify-between">
                <div>
                  <strong>Entreprise Name :</strong>
                  <br>
                  <br>
                  <strong>Adress :</strong>
                  <br>
                  <br>
                  <strong>Work Days per Week :</strong>
                </div>
                <div class="mr-28">
                    <strong>Employees :</strong>
                    <br>
                    <br>
                    <strong>Activity Area :</strong>
                    <br>
                    <br>
                  <strong>Suscription :</strong>
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>
            <button @click="closeGeneral" class="mt-4 inline-flex ml-56 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-950 hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
              Edit
            </button>
        </div>
      </div>
    </div>
  </transition>

  <!-- LogOut -->
  <transition name="fade">
    <div v-if="isLogout" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h3 class="text-2xl bold font-bold text-blue-900"><span>LogOut</span></h3>
        <p class="mt-2 text-sm text-gray-500">GoodBye!</p>
        <button @click="logout" class="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
          Exit
        </button>
        <button @click="closeLogout" class="mt-4 ml-5 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
          Cancel
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import Card from '../components/Card.vue';
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import {ref} from "vue";
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import {ChevronUpIcon} from "@heroicons/vue/20/solid";
import router from "@/router";

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