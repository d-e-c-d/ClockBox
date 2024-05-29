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

<script setup lang="ts">
import Card from '../components/Card.vue';
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import {ref} from "vue";

const isLogout = ref(false);

const closeLogout = () => {
  isLogout.value = false;
};
const openLogout = () => {
    isLogout.value = true;
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