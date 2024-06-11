<template>
  <div class="bg-gray-100">
    <Header />
    <Sidebar />
    <div class="min-h-screen flex">
      <div class="flex flex-col ml-72 p-12 mt-16 bg-white rounded-2xl shadow-2xl">
        <div class="flex justify-between items-center mb-10 w-full">
          <h2 class="text-4xl font-light">{{ currentMonth }}</h2>
          <button class="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-xl mr-3 flex" @click="openProgram">
            <svg width="20" height="20" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
              <path d="M12.5724 2.70602H2.84528C2.07783 2.70602 1.45569 3.3898 1.45569 4.23329V14.9241C1.45569 15.7676 2.07783 16.4514 2.84528 16.4514H12.5724C13.3399 16.4514 13.962 15.7676 13.962 14.9241V4.23329C13.962 3.3898 13.3399 2.70602 12.5724 2.70602Z" stroke="#9295AB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10.488 1.17876V4.23328M4.92967 1.17876V4.23328M1.45569 7.28781H13.962" stroke="#9295AB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p class="font-light">Program</p>
          </button>
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
                      <div class="ml-12 transform transition-transform duration-200 ease-in-out hover:scale-105 hover:z-10" @click="delEvent(event.id)">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.25 5.25L3.75 5.25001" stroke="#0842A0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M9.75 9.75V15.75" stroke="#0842A0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M14.25 9.75V15.75" stroke="#0842A0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M18.75 5.25V19.5C18.75 19.6989 18.671 19.8897 18.5303 20.0303C18.3897 20.171 18.1989 20.25 18 20.25H6C5.80109 20.25 5.61032 20.171 5.46967 20.0303C5.32902 19.8897 5.25 19.6989 5.25 19.5V5.25" stroke="#0842A0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M15.75 5.25V3.75C15.75 3.35218 15.592 2.97064 15.3107 2.68934C15.0294 2.40804 14.6478 2.25 14.25 2.25H9.75C9.35218 2.25 8.97064 2.40804 8.68934 2.68934C8.40804 2.97064 8.25 3.35218 8.25 3.75V5.25" stroke="#0842A0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
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
            Previous Week
          </button>
          <button
              class="bg-gray-300 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
              :disabled="currentPage === totalPages - 1"
              @click="goToPage(currentPage + 1)"
          >
            Next Week
          </button>
        </div>

      </div>
    </div>
  </div>
  <!-- Program -->
  <transition name="fade">
    <div v-if="isProgram" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
        <h3 class="text-2xl bold font-bold text-blue-900 mb-5"><span>Calendar</span></h3>
        <form @submit.prevent="add">
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Event Name<span class="text-red-600">*</span></label>
            <input v-model="eventName" type="text" class="w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Day<span class="text-red-600">*</span></label>
            <select v-model="eventDay" class="w-full px-3 py-2 border rounded-xl focus:outline-none bg-white" required>
              <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Schedules<span class="text-red-600">*</span></label>
            <input v-model="eventTime" type="text" class="w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom" required placeholder="ex: 8:00 - 18:00"/>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Color<span class="text-red-600">*</span></label>
            <select v-model="eventColor" class="w-full px-3 py-2 border rounded-xl focus:outline-none bg-white" required>
              <option value="bg-yellow-100">Yellow</option>
              <option value="bg-pink-100">Pink</option>
              <option value="bg-blue-100">Blue</option>
              <option value="bg-purple-100">Purple</option>
            </select>
          </div>
        </form>
        <button class="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" @click="addEvent">
          Add
        </button>
        <button @click="closeProgram" class="mt-4 ml-5 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
          Cancel
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import { ref, computed, onMounted } from 'vue';
import { format, addDays, startOfWeek, addWeeks } from 'date-fns';

const eventName = ref('');
const eventDay = ref('');
const eventTime = ref('');
const eventColor = ref('');
const error = ref('');


const isProgram = ref(false);
const closeProgram = () => {
  isProgram.value = false;
}
const openProgram = () => {
  isProgram.value = true;
}

const calendarDatas = ref<Array>([
  { id: 1, day: "Mon", name: "Meeting", time: "10:00 - 11:00", color: "bg-yellow-100" },
  { id: 2, day: "Mon", name: "Design Review", time: "10:00 - 11:00", color: "bg-pink-100" },
  { id: 3, day: "Tue", name: "Weekly Report", time: "10:00 - 11:00", color: "bg-blue-100" },
  { id: 4, day: "Tue", name: "Discussion", time: "10:00 - 11:00", color: "bg-purple-100" },
  { id: 5, day: "Tue", name: "Weekly Report", time: "10:00 - 11:00", color: "bg-blue-100" },
  { id: 6, day: "Tue", name: "Discussion", time: "10:00 - 11:00", color: "bg-purple-100" },
]);

const saveCalendarToLocalStorage = (calendarDatas: CalendarData[]) => {
  if (!localStorage.getItem('calendarData')) {
    localStorage.setItem('calendarData', JSON.stringify(calendarDatas));
  }
}

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


const events = ref([]);
onMounted(() => {
  const storedEvents = localStorage.getItem('calendarData');
  if (storedEvents) {
    calendarDatas.value = JSON.parse(storedEvents);
  }
});
// addEvent
const addEvent = () => {
  let lastId = 0;
  if (calendarDatas.value && calendarDatas.value.length > 0) {
    lastId = calendarDatas.value[calendarDatas.value.length - 1].id;
  }

  const newEvent = {
    id: lastId + 1,
    day: eventDay.value,
    name: eventName.value,
    time: eventTime.value,
    color: eventColor.value,
  }

  calendarDatas.value.push(newEvent);
  localStorage.setItem('calendarData', JSON.stringify(calendarDatas.value));

  if (!eventDay.value
      || !eventTime.value
      || !eventColor.value
      || !eventName.value) {
    error.value = 'Entrez les informations !';
    return;
  }
  error.value = '';
  closeProgram();
  eventColor.value = '';
  eventDay.value = '';
  eventName.value = '';
  eventTime.value = '';
}
// Delete Event
const delEvent = (eventId: number) => {
  const eventIndex = calendarDatas.value.findIndex(event => event.id === eventId);
  if (eventIndex !== -1) {
    calendarDatas.value.splice(eventIndex, 1);
    localStorage.setItem('calendarData', JSON.stringify(calendarDatas.value));
  }
}

const goToPage = (page: number) => {
  if (page >= 0 && page < totalPages.value) {
    currentPage.value = page;
  }
};
</script>
