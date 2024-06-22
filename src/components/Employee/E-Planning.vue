<template>
  <div class="bg-gray-100">
    <EHeader />
    <ESidebar />
    <div class="min-h-screen flex">
      <div class="flex flex-col ml-72 p-12 mt-16 bg-white rounded-2xl shadow-2xl">
        <div class="flex justify-between items-center mb-10 w-full">
          <h2 class="text-4xl font-light">{{ currentMonth }}</h2>
        </div>
        <div class="overflow-x-auto rounded-xl w-full">
          <div>
            <div class="grid grid-cols-7 gap-4 mb-8 p-4 uppercase bg-gray-300 text-gray-600">
              <div v-for="day in daysWithDates" :key="day.name" class="text-center font-bold">
                {{ day.name }} {{ day.date }}
              </div>
            </div>

            <div class="grid grid-cols-7 gap-4">
              <div v-for="day in daysWithDates" :key="day.name" class="p-4 border-2 border-dashed border-purple-500 rounded-lg">
                <div v-for="event in calendarDatas" :key="event.id" class="mb-2">
                  <div v-if="event.day === day.name" class="p-4 rounded-lg" :class="event.color">
                    <div class="font-semibold">{{ event.name }}</div>
                    <div class="text-sm">
                      {{ event.time }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-between mt-4 w-full">
          <button
              class="bg-gray-300 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mr-2"
              :disabled="currentPage === 0"
              @click="goToPage(currentPage - 1)"
          >
            {{ $t('calendar.previousWeek') }}
          </button>
          <button
              class="bg-gray-300 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
              :disabled="currentPage === totalPages - 1"
              @click="goToPage(currentPage + 1)"
          >
            {{ $t('calendar.nextWeek') }}
          </button>
        </div>

      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { format, addDays, startOfWeek, addWeeks } from 'date-fns';
import {useStorage} from "@vueuse/core";
import EHeader from "@/components/Employee/E-Header.vue";
import ESidebar from "@/components/Employee/E-Sidebar.vue";

const eventName = ref('');
const eventDay = ref('');
const eventTime = ref('');
const eventColor = ref('');
const error = ref('');

const calendarDatas = useStorage('calendarDatas', [])

const currentPage = ref(0);
const totalPages = ref(4);
const currentMonth = computed(() => format(addWeeks(startOfCurrentWeek.value, currentPage.value), 'MMMM yyyy'));

const days = ref(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
const startOfCurrentWeek = ref(startOfWeek(new Date(), { weekStartsOn: 0 }));

const daysWithDates = computed(() => {
  const startOfWeekDate = addWeeks(startOfCurrentWeek.value, currentPage.value);
  return days.value.map((day, index) => ({
    name: day,
    date: format(addDays(startOfWeekDate, index), 'd')
  }));
});
const goToPage = (page: number) => {
  if (page >= 0 && page < totalPages.value) {
    currentPage.value = page;
  }
};

</script>
